/*
Imports
*/
const express = require('express');
const authRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const passport = require('passport');
const { jwtSecret } = require('../../constants');
const jwt = require('jsonwebtoken');

/*
Routes definition
*/
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
    authRouter.post('/signUp', (req, res) => {
      const { email, username, password } = req.body;

      User.register(new User({ email, username }), password, (error, user) => {
        if (error) {
          return res.status(400).send({ message: error.message });
        }

        return res.status(200).send({ msg: 'Success signin', user });
      });
    });

    // Login
    authRouter.post('/login', (req, res, next) => {
      passport.authenticate('local', (error, user, info) => {
        if (error) {
          error = err.length ? error : 'Something went wrong login';
          return res.status(500).send({ error });
        }
        if (!user) return res.status(401).send({ message: 'User or password is incorrect' });

        req.logIn(user, error => {
          if (error) {
            error = error.length ? error : 'Something went wrong login';
            return res.status(500).send({ error });
          }

          const token = jwt.sign({ id: user.username }, jwtSecret.secret, { expiresIn: '1d' });

          return res
            .status(200)
            .send({ status: 'SUCCESS', token, message: 'Successfully login', user });
        });
      })(req, res, next);
    });
  }

  init() {
    this.routes();
    return authRouter;
  }
}

/*
Export
*/
module.exports = AuthRouterClass;
//
