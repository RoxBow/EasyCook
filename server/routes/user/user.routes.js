const express = require('express');
const userRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const ShoppingList = require('../../models/ShoppingList');

class UserRouterClass {
  routes() {
    userRouter.get('/', (req, res) => {
      res.send({ msg: 'HATEOAS for user' });
    });

    userRouter.get('/shoppingList', (req, res) => {
      res.send({ shoppingList: req.user.shoppingList });
    });

    userRouter.post('/shoppingList/add', (req, res) => {
      const { name, aliments } = req.body;

      const shoppingListAdded = new ShoppingList({ name, aliments });

      shoppingListAdded.save(err => {
        if (err) console.log('ERR SAVE', err);

        User.updateOne({ _id: req.user._id }, { $push: { shoppingList: shoppingListAdded } }, err => {
          if(err) console.log('Err update user', err);
          
        });
      });

      res.status(200).send({ status: 'SUCCESS' });
    });
  }

  init() {
    this.routes();
    return userRouter;
  }
}

module.exports = UserRouterClass;
