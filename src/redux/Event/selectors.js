export const currentEventSelector = (events, idEvent) => events.find(({ _id }) => _id === idEvent);
