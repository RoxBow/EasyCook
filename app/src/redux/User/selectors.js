import { compose } from 'recompose';

const USER = 'user';
const stateSelector = state => state[USER];

export const currentUsernameSelector = compose(
  ({ username }) => ({ username }),
  ({ info }) => ({ info }),
  stateSelector,
);