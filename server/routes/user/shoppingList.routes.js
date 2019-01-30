const express = require('express');
const shoppingListRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const ShoppingList = require('../../models/ShoppingList');

class ShoppingListRouterClass {
  routes() {
    shoppingListRouter.get('/', (req, res) => {
      User.findById(req.user._id)
        .populate('shoppingLists')
        .exec((err, user) => {
          res.send({ shoppingList: user.shoppingLists });
        });
    });

    shoppingListRouter.post('/add', (req, res) => {
      const { name, maxDate } = req.body;

      const shoppingListAdded = new ShoppingList({ name, maxDate });

      shoppingListAdded.save(err => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { shoppingLists: shoppingListAdded } },
          { new: true }
        )
          .populate('shoppingLists')
          .exec((err, user) => {
            if (err) console.log('Something wrong when updating data!');

            res.status(200).send({ status: 'SUCCESS', shoppingList: user.shoppingLists });
          });
      });
    });

    shoppingListRouter.post('/toggleValidAliment', (req, res) => {
      const { idAliment, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList, (err, shoppingList) => {
        if (err) console.log(err);

        const updatedIngredient = shoppingList.ingredients.find(({ id }) => id === idAliment);
        updatedIngredient.isValidate = !updatedIngredient.isValidate;

        shoppingList.save((err, updatedShoppingList) => {
          if (err) console.log(err);

          User.findById({ _id: req.user._id })
            .populate('shoppingLists')
            .exec((err, user) => {
              res.status(200).send({
                status: 'SUCCESS',
                currentShoppingList: updatedShoppingList,
                shoppingList: user.shoppingLists
              });
            });
        });
      });
    });

    shoppingListRouter.post('/shoppingListItem/togglePin', (req, res) => {
      const { idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList, (err, shoppingList) => {
        if (err) console.log(err);

        shoppingList.isPin = !shoppingList.isPin;

        shoppingList.save((err, updatedShoppingList) => {
          if (err) console.log(err);

          User.findById({ _id: req.user._id })
            .populate('shoppingLists')
            .exec((err, user) => {
              res.status(200).send({
                status: 'SUCCESS',
                shoppingList: user.shoppingLists
              });
            });
        });
      });
    });

    shoppingListRouter.post('/shoppingListItem/add', (req, res) => {
      const { idIngredient, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList, (err, shoppingList) => {
        if (err) console.log(err);

        shoppingList.ingredients.push({ id: idIngredient });

        shoppingList.save((err, updatedShoppingList) => {
          if (err) console.log(err);

          User.findById({ _id: req.user._id })
            .populate('shoppingLists')
            .exec((err, user) => {
              console.log('USER', user);
              res.status(200).send({
                status: 'SUCCESS',
                currentShoppingList: updatedShoppingList,
                shoppingList: user.shoppingLists
              });
            });
        });
      });
    });
  }

  init() {
    this.routes();
    return shoppingListRouter;
  }
}

module.exports = ShoppingListRouterClass;
