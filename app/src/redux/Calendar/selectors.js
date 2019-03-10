import { compose } from 'recompose';

const CALENDAR = 'calendar';
const stateSelector = state => state[CALENDAR];

export const recipesCalendarSelector = compose(
  ({ recipes }) => ({ recipesCalendar: recipes }),
  stateSelector
);

