import { SHOPPING_LIST } from '../ShoppingList/actions';
import { compose } from 'recompose';
import { sortArrayAlphabetically } from '../../constants/helpers';

const stateSelector = state => state[ SHOPPING_LIST];

export const shoppingListSelector = compose(
  ({ shoppingLists }) => ({ shoppingLists }),
  stateSelector
);

export const isFetchingSelector = compose(
  ({ isFetching }) => ({ isFetching }),
  stateSelector
);

export const currentShoppingListSelector = idShoppingList =>
  compose(
    currentShoppingList => ({ currentShoppingList }),
    ({ shoppingLists }) => shoppingLists.find(({ _id }) => _id === idShoppingList),
    ({ shoppingLists }) => ({ shoppingLists }),
    stateSelector
  );

export const usersSelectedSelector = compose(
  ({ usersSelected }) => ({ usersSelected  }),
  stateSelector
);

export const usersSelector = compose(
  users => ({ users }),
  ({ users }) => sortArrayAlphabetically(users, 'username'),
  ({ users }) => ({ users }),
  stateSelector
);
