import { compose } from 'recompose';

const USER = 'user';
const stateSelector = state => state[USER];

export const currentUsernameSelector = compose(
  ({ info }) => ({ currentUsername: info.username }),
  stateSelector,
);

export const favRecipesSelector = compose(
  ({ info }) => ({ currentFavRecipes: info.favRecipes }),
  stateSelector,
);

export const fridgeSelector = compose(
  ({ info }) => ({ currentFridge: info.fridge }),
  stateSelector,
);