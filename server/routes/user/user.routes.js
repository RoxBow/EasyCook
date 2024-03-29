const express = require('express');
const userRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const Image = require('../../models/Image');
const multer = require('multer');
const { getExtFromMime, randomId, addOrRemoveInArray } = require('../../helpers.js');

const storage = multer.diskStorage({
  destination: './assets/avatars/users/',
  filename: (req, file, cb) => {
    const extension = getExtFromMime(file.mimetype);
    const id = randomId();

    cb(null, id + '.' + extension);
  }
});

const upload = multer({
  storage
});

class UserRouterClass {
  routes() {
    userRouter.get('/', (req, res) => {
      res.send({ msg: 'HATEOAS for user' });
    });

    userRouter.put('/favRecipe', (req, res) => {
      const { idRecipe } = req.body;

      User.findById(req.user._id).exec((err, user) => {
        addOrRemoveInArray(user.favRecipes, idRecipe);

        user.save((err, user) => {
          res.status(200).send({ status: 'SUCCESS', messageInfo: 'Modifié avec succès', user });
        });
      });
    });

    userRouter.put('/edit', upload.single('file'), (req, res) => {
      const { firstName, lastName, localization, bio } = JSON.parse(req.body.data);

      const avatar = new Image({
        uri: (req.file && req.file.path) || 'assets/avatars/users/user_default.jpg'
      });

      avatar.save();

      console.log('req.body.data', req.body.data);

      User.findById(req.user._id).exec((err, user) => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.localization = localization;
        user.bio = bio;
        user.avatar = avatar;

        user.save((err, user) => {
          if (err) {
            console.log('err', err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }

          res.status(200).send({ status: 'SUCCESS', messageInfo: 'Modifié avec succès', user });
        });
      });
    });

    userRouter.put('/fridge', upload.single('file'), (req, res) => {
      const { fridge } = req.body;

      User.findById(req.user._id).exec((err, user) => {
        user.fridge = fridge;

        user.save((err, user) => {
          res.status(200).send({ status: 'SUCCESS', fridge: user.fridge });
        });
      });
    });

    userRouter.delete('/delete', (req, res) => {
      User.deleteOne({ _id: req.user._id }).exec((err, user) => {
        res.status(200).send({ status: 'SUCCESS' });
      });
    });
  }

  init() {
    this.routes();
    return userRouter;
  }
}

module.exports = UserRouterClass;
