const express = require('express');
const shoppingListRouter = express.Router({ mergeParams: true });
const User = require('../../models/User');
const ShoppingList = require('../../models/ShoppingList');

class ShoppingListRouterClass {
  routes() {
    const populateFields = [
      { path: 'users', populate: { path: 'avatar' } },
      { path: 'ingredients.user', select: 'avatar', populate: { path: 'avatar' } }
    ];

    shoppingListRouter.get('/', (req, res) => {
      ShoppingList.find({ users: req.user._id })
        .populate(populateFields)
        .exec((err, shoppingLists) => {
          res.send({ shoppingLists });
        });
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

      shoppingListAdded.save((err, shoppingListAdded) => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        ShoppingList.find({ users: req.user._id })
          .populate(populateFields)
          .exec((err, shoppingLists) => {
            res.status(200).send({ status: 'SUCCESS', shoppingLists, shoppingListAdded });
          });
      });
    });

    shoppingListRouter.post('/toggleValidAliment', (req, res) => {
      const { idAliment, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList)
        .populate(populateFields)
        .exec((err, shoppingList) => {
          if (err) console.log(err);

          const updatedIngredient = shoppingList.ingredients.find(
            ({ refId }) => refId === idAliment
          );
          updatedIngredient.isValidate = !updatedIngredient.isValidate;

          // if ingredient validated, link user to it
          // else remove him
          if (updatedIngredient.isValidate) {
            updatedIngredient.user = req.user._id;
          } else {
            updatedIngredient.user = null;
          }

          shoppingList.save((err, updatedShoppingList) => {
            if (err) console.log(err);

            updatedShoppingList.populate(populateFields, (err, updatedShoppingList) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ status: 'FAILURE', errorMessage: err });
              }
              res.status(200).send({
                status: 'SUCCESS',
                currentShoppingList: updatedShoppingList
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

          ShoppingList.find({ users: req.user._id })
            .populate(populateFields)
            .exec((err, shoppingLists) => {
              res.status(200).send({
                status: 'SUCCESS',
                shoppingLists
              });
            });
        });
      });
    });

    shoppingListRouter.post('/shoppingListItem/add', (req, res) => {
      const { idIngredient, quantity, unity, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList)
        .populate(populateFields)
        .exec((err, shoppingList) => {
          if (err) console.log(err);

          shoppingList.ingredients.push({ refId: idIngredient, quantity, unity });

          shoppingList.save((err, updatedShoppingList) => {
            if (err) console.log(err);

            res.status(200).send({
              status: 'SUCCESS',
              currentShoppingList: updatedShoppingList
            });
          });
        });
    });

    shoppingListRouter.put('/shoppingListItem/editUsers', (req, res) => {
      const { users, idShoppingList } = req.body;

      ShoppingList.findById(idShoppingList, (err, shoppingList) => {
        if (err) console.log(err);

        shoppingList.users = shoppingList.users.concat(users);

        shoppingList.save((err, updatedShoppingList) => {
          if (err) console.log(err);

          ShoppingList.populate(updatedShoppingList, populateFields, (err, updatedShoppingList) => {
            res.status(200).send({
              status: 'SUCCESS',
              currentShoppingList: updatedShoppingList
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
