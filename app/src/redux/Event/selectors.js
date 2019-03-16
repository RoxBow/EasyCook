import { isUserInArray } from '../../constants/helpers';
import { compose } from 'recompose';
import { EVENT } from './actions';

const stateSelector = state => state[EVENT];

export const eventsSelector = compose(
  ({ events }) => ({ events }),
  stateSelector
);

export const currentEventSelector = idEvent =>
  compose(
    currentEvent => ({ currentEvent }),
    ({ events }) => events.find(({ _id }) => _id === idEvent),
    ({ events }) => ({ events }),
    stateSelector
  );

export const userEventsSelector = idUser =>
  compose(
    userEvents => ({ userEvents }),
    ({ events }) =>
      events.filter(event => {
        const interestedOrParticipate = event.interested.concat(event.participants);
        if (isUserInArray(interestedOrParticipate, idUser)) return event;
      }),

    ({ events }) => ({ events }),
    stateSelector
  );
