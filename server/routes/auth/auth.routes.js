if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const authRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const Image = require('../../models/Image');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "./assets/avatars/users/",
  filename: (req, file, cb) => {
    const extension =  getExtFromMime(file.mimetype);
    const id = randomId();

    cb(null, id + '.'+ extension)
  }
});

const upload = multer({
  storage
});

class AuthRouterClass {
  routes() {
    // HATEOAS
    authRouter.get('/', (req, res) => {
      res.send('HATEOAS for auth');
    });

    // Signin with token
    authRouter.get('/token', (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
          error = error || !user ? error : 'Unauthorized';
          return res.status(500).send({ error });
        }

        req.logIn(user, error => {
          if (error) {
            error = error.length ? error : 'Something went wrong token';
            return res.status(500).send({ error });
          }

          return res.status(200).send({ status: 'SUCCESS', message: 'Successfully login', user });
        });
      })(req, res, next);
    });

    // Register
    authRouter.post('/signUp', upload.single('file'), (req, res) => {
      const { email, username, password } = req.body;

      const avatar = new Image({ 
        uri: (req.file && req.file.path) || 'assets/avatars/users/user_default.jpg'
      });

      avatar.save();

      let user = new User({ 
        email, 
        username,
        avatar, 
      });

      user.password = user.encryptPassword(password);

      user.save(err => {
        if (err){
          console.log('err', err);
          return res.status(400).send({ message: err.message });
        } else {
          return res.status(200).send({ msg: 'Success signin', user });
        }
      });

    });

    // Login
    authRouter.post('/login', (req, res, next) => {
      passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error) {
          error = error && error.length ? error : 'Something went wrong login';
          return res.status(500).send({ error });
        }

        if (!user) return res.status(401).send({ message: 'User or password is incorrect' });

        req.logIn(user, error => {
          if (error) {
            error = error.length ? error : 'Something went wrong login';
            return res.status(500).send({ error });
          }

          const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

          return res
            .status(200)
            .send({ status: 'SUCCESS', token, message: 'Successfully login', user });
        });
      })(req, res, next);
    });

    authRouter.get('/logout', (req, res) => {
      req.logout();
      return res.status(200).send({ status: 'SUCCESS', message: 'Successfully logout' });
    });
  }

  init() {
    this.routes();
    return authRouter;
  }
}

module.exports = AuthRouterClass;
