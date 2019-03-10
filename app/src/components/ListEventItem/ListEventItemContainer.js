import React from 'react';
import { connect } from 'react-redux';
import ListEventItem from './ListEventItem';
import { compose, withProps, renderComponent, branch } from 'recompose';
import Empty from '../Empty/Empty';
import { eventsSelector } from '../../redux/Event/selectors';
import { DATE } from '../../constants/global';

export default compose(
  connect(eventsSelector),
  withProps(({ events, selectedMonth }) => ({
    events: events.filter(({ date }) => DATE.month[new Date(date).getMonth()] === selectedMonth),
    selectedMonth
  })),
  branch(
    ({ events }) => !events.length,
    renderComponent(() => <Empty text="Aucun événement de prévu ce mois-ci" />)
  )
)(ListEventItem);
