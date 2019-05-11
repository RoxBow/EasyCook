import { compose } from 'recompose';
import { USER } from './actions';

const stateSelector = state => state[USER];

export const currentUsernameSelector = compose(
  ({ info }) => ({ currentUsername: info.username }),
  stateSelector,
);

export const favRecipesSelector = compose(
  ({ info }) => ({ currentFavRecipes: info.favRecipes }),
  stateSelector,
);

export const infoSelector = compose(
  ({ info }) => ({ info }),
  stateSelector,
);

export const fridgeSelector = compose(
  ({ info }) => ({ currentFridge: info.fridge }),
  stateSelector,
);

export const isInterestedSelector = listInterested => compose(
  isInterested => ({ isInterested }),
  ({ _id }) => listInterested.some(({ _id: idUser }) => idUser === _id),
  ({ info }) => ({ _id: info._id }),
  infoSelector
);

export const isParticipantSelector = listParticipant => compose(
  isParticipant => ({ isParticipant }),
  ({ _id }) => listParticipant.some(({ _id: idUser }) => idUser === _id),
  ({ info }) => ({ _id: info._id }),
  infoSelector
);