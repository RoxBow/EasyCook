import { compose } from 'recompose';
import { RECIPE } from './actions';

const stateSelector = state => state[RECIPE];

export const refDataSelector = compose(
  ({ refEquipments, refIngredients }) => ({ refEquipments, refIngredients }),
  stateSelector
);

export const recipesSelector = compose(
  ({ recipes }) => ({ recipes }),
  stateSelector
);

export const currentRecipeSelector = idRecipe =>
  compose(
    currentRecipe => ({ currentRecipe }),
    ({ recipes }) => recipes.find(({ _id }) => _id.toString() === idRecipe.toString()),
    recipesSelector
  );

export const categoryRecipesSelector = category =>
  compose(
    recipes => ({ recipes }),
    ({ recipes }) => recipes.filter(recipe => recipe.category === category),
    recipesSelector
  );
