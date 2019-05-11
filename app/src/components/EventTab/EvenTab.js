import styles from './EventTab.style';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { eventsSelector } from '../../redux/Event/selectors';
import { combineSelectors } from '../../constants/helpers';
import { DATE_SELECT, DATE } from '../../constants/global';
import { withStateHandlers, compose } from 'recompose';
import Select from '../Select/Select';
import { Root } from 'native-base';
import ListEventItem from '../ListEventItem/ListEventItemContainer';

const EventTab = ({ onSelectMonth, selectedMonth }) => (
  <Root>
    <View style={{ minHeight: '100%' }}>
      <Select
        values={DATE_SELECT}
        bold={true}
        updateValue={(value, indexValue) => onSelectMonth(value, indexValue)}
        style={styles.select}
        selected={selectedMonth}
        styleText={styles.selectText}
        icon="chevron_select--white"
        size={14}
      />
      <ListEventItem selectedMonth={selectedMonth} />
    </View>
  </Root>
);

const mapStateToProps = combineSelectors(eventsSelector);

export default compose(
  connect(mapStateToProps),
  withStateHandlers(
    ({ selectedMonth = DATE.month[new Date().getMonth()] }) => ({
      selectedMonth
    }),
    {
      onSelectMonth: () => month => ({
        selectedMonth: month
      })
    }
  )
)(EventTab);
