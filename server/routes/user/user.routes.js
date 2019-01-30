const express = require('express');
const userRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');

class UserRouterClass {
  routes() {
    userRouter.get('/', (req, res) => {
      res.send({ msg: 'HATEOAS for user' });
    });

    userRouter.put('/edit', (req, res) => {
      const { firstName, lastName, localization, bio } = req.body;
      console.log(',frs');
      User.findById(req.user._id).exec((err, user) => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.localization = localization;
        user.bio = bio;

        user.save((err, user) => {
          if (err) {
            console.log('err', err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }

          res.status(200).send({ status: 'SUCCESS', messageInfo: 'Modifié avec succès', user });
        });
      });
    });
  }

  init() {
    this.routes();
    return userRouter;
  }
}

module.exports = UserRouterClass;
