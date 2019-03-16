import { compose } from 'recompose';
import { CALENDAR } from './actions';

const stateSelector = state => state[CALENDAR];

export const recipesCalendarSelector = compose(
  ({ recipes }) => ({ recipesCalendar: recipes }),
  stateSelector
);

