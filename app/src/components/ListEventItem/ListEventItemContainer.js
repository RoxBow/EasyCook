import React from 'react';
import { connect } from 'react-redux';
import ListEventItem from './ListEventItem';
import { compose, withProps, renderComponent, branch } from 'recompose';
import { eventsSelector } from '../../redux/Event/selectors';
import { fetchEvents } from '../../redux/Event/actions';
import { DATE } from '../../constants/global';

export default compose(
  connect(
    eventsSelector,
    dispatch => ({
      fetchEvents: () => dispatch(fetchEvents())
    })
  ),
  withProps(({ events, selectedMonth, ...rest }) => ({
    events: events.filter(({ date }) => DATE.month[new Date(date).getMonth()] === selectedMonth),
    selectedMonth,
    ...rest
  }))
)(ListEventItem);
