const express = require('express');
const shoppingListRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const ShoppingList = require('../../models/ShoppingList');

class ShoppingListRouterClass {
  routes() {
    const populateFields = [{ path: 'users', populate: { path: 'avatar' } }];

    shoppingListRouter.get('/', (req, res) => {
      ShoppingList.find({ users: req.user._id })
        .populate(populateFields)
        .exec((err, shoppingLists) => {
          res.send({ shoppingList: shoppingLists });
        });

      // User.findById(req.user._id)
      //   .populate(populateFields)
      //   .exec((err, user) => {
      //     res.send({ shoppingList: user.shoppingLists });
      //   });
    });

    shoppingListRouter.get('/users', (req, res) => {
      // find all except me
      User.find({ _id: { $nin: req.user._id } })
        .populate('avatar')
        .exec((err, users) => {
          res.status(200).send({ users });
        });
    });

    shoppingListRouter.post('/add', (req, res) => {
      let { name, maxDate, users } = req.body;

      // add me to users
      users = [req.user._id, ...users];

      const shoppingListAdded = new ShoppingList({ name, maxDate, users });

      shoppingListAdded.save(err => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        ShoppingList.find({ users: req.user._id })
          .populate(populateFields)
          .exec((err, shoppingLists) => {
            res.status(200).send({ status: 'SUCCESS', shoppingList: shoppingLists });
          });
      });
    });

    shoppingListRouter.post('/toggleValidAliment', (req, res) => {
      const { idAliment, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList)
        .populate(populateFields)
        .exec((err, shoppingList) => {
          if (err) console.log(err);

          const updatedIngredient = shoppingList.ingredients.find(({ id }) => id === idAliment);
          updatedIngredient.isValidate = !updatedIngredient.isValidate;

          shoppingList.save((err, updatedShoppingList) => {
            if (err) console.log(err);

            res.status(200).send({
              status: 'SUCCESS',
              currentShoppingList: updatedShoppingList
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

          ShoppingList.find({ users: req.user._id })
            .populate(populateFields)
            .exec((err, shoppingLists) => {
              res.status(200).send({
                status: 'SUCCESS',
                currentShoppingList: updatedShoppingList,
                shoppingList: shoppingLists
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

          ShoppingList.find({ users: req.user._id })
            .populate(populateFields)
            .exec((err, shoppingLists) => {
              res.status(200).send({
                status: 'SUCCESS',
                currentShoppingList: updatedShoppingList,
                shoppingList: shoppingLists
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
