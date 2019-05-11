import React from 'react';
import ListDay from '../ListDay/ListDayContainer';
import Select from '../../Select/Select';
import DateContent from '../DateContent/DateContentContainer';
import { DATE_SELECT } from '../../../constants/global';
import { View } from 'react-native';

const Calendar = ({ selectedMonth, onSelectMonth, indexSelectedMonth }) => (
  <View>
    <Select
      values={DATE_SELECT}
      bold={true}
      updateValue={(value, indexValue) => onSelectMonth(value, indexValue)}
      selected={selectedMonth}
      style={{ width: 150 }}
      styleText={{ fontSize: 24 }}
      icon="chevron_select"
      size={14}
    />
    <View>
      <ListDay indexSelectedMonth={indexSelectedMonth} />
      <DateContent />
    </View>
  </View>
);

export default Calendar;
