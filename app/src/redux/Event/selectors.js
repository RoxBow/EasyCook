import { isUserInArray } from '../../constants/helpers';

export const currentEventSelector = (events, idEvent) => events.find(({ _id }) => _id === idEvent);

export const userEventsSelector = (events, idUser) => 
  events.filter(event => {
    const interestedOrParticipate = event.interested.concat(event.participants);
    if(isUserInArray(interestedOrParticipate, idUser)) return event;
  });
