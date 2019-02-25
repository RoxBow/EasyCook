const express = require('express');
const recipeRouter = express.Router({ mergeParams: true });
const Recipe = require('../../models/Recipe');
const Image = require('../../models/Image');
const multer = require('multer');
const { getExtFromMime, randomId } = require('../../helpers.js');

const storage = multer.diskStorage({
  destination: './assets/avatars/recipes/',
  filename: (req, file, cb) => {
    const extension = getExtFromMime(file.mimetype);
    const id = randomId();

    cb(null, id + '.' + extension);
  }
});

const upload = multer({
  storage
});

class RecipeRouterClass {
  routes() {
    const populateFields = ['image', { path: 'creator', populate: { path: 'avatar' } }];

    recipeRouter.get('/', (req, res) => {
      Recipe.find({})
        .populate(populateFields)
        .exec((err, recipes) => {
          res.status(200).send({ recipes });
        });
    });

    recipeRouter.put('/add', upload.single('file'), (req, res) => {
      let {
        name,
        category,
        level,
        preparationTime,
        cookingTime,
        steps,
        ingredients,
        equipments
      } = req.body;

      const avatar = new Image({
        uri: (req.file && req.file.path) || 'assets/avatars/recipes/recipe_default.jpg'
      });

      avatar.save();

      steps = JSON.parse(steps);
      ingredients = JSON.parse(ingredients);
      equipments = JSON.parse(equipments);

      const recipeAdded = new Recipe({
        name,
        category,
        level,
        preparationTime,
        cookingTime,
        steps,
        ingredients,
        equipments,
        creator: req.user._id,
        image: avatar
      });

      recipeAdded.save((err, recipe) => {
        if (err) {
          console.log('err', err);
          return res.status(400).send({ status: 'FAILURE', errorMessage: err });
        }

        recipe.populate(populateFields, (err, recipeAdded) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ status: 'FAILURE', errorMessage: err });
          }
          res.status(200).send({ status: 'SUCCESS', recipe: recipeAdded });
        });
      });
    }); // put /add
  } // end routes()

  init() {
    this.routes();
    return recipeRouter;
  }
}

module.exports = RecipeRouterClass;
