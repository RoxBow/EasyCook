/*
Imports
*/
const express = require('express');
const authRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const passport = require('passport');

//

/*
Routes definition
*/
class AuthRouterClass {
  routes() {
    // HATEOAS
    authRouter.get('/', (req, res) => {
      res.send('HATEOAS for auth');
    });

    // Register
    authRouter.post('/signIn', (req, res) => {
      const { email, username, password } = req.body;

      User.register(new User({ email, username }), password, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).send({ message: err.message });
        }

        return res.status(200).send({ msg: 'Sucess signin', user });
      });
    });

    // Login
    authRouter.post('/login', (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).send({ err });
        if (!user) return res.status(401).send({ message: 'User or password is incorrect' });

        return res.status(200).send({ status: "SUCCESS", message: "Successfully login" });
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
