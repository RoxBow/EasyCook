const express = require('express');
const calendarRouter = express.Router({ mergeParams: true });
const RecipeCalendar = require('../../models/RecipeCalendar');

class CalendarRouterClass {
  routes() {

    calendarRouter.get('/', (req, res) => {
      RecipeCalendar.find({})
        .exec((err, recipesCalendar) => {
          res.status(200).send({ recipesCalendar });
        });
    });

    calendarRouter.post('/add', (req, res) => {
      const { idRecipe, date } = req.body;

      const recipeCalendar = new RecipeCalendar({
        refRecipe: idRecipe,
        date: JSON.parse(date)
      });

      recipeCalendar.save((err, recipeCalendar) => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        res.status(200).send({ status: 'SUCCESS', recipeCalendar });
      });
    }); // put /add
  } // end routes()

  init() {
    this.routes();
    return calendarRouter;
  }
}

module.exports = CalendarRouterClass;
