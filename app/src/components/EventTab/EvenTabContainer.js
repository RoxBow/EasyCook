import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { orderByDate } from '../../constants/helpers';
import EventTab from './EvenTab';
import { eventsSelector } from '../../redux/Event/selectors';

export default compose(
  connect(eventsSelector),
  withProps(({ events }) => ({
    events: orderByDate(events)
  }))
)(EventTab);
