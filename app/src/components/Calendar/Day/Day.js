import styles from './Day.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../Text/Text';
import Mark from '../Mark/Mark';
import { connect } from 'react-redux';
import { setSelectedDate } from '../../../redux/Calendar/actions';
import {
  selectedDateSelector,
  recipesCalendarWithDataSelector
} from '../../../redux/Calendar/selectors';
import { combineSelectors, equalDate } from '../../../constants/helpers';
import { RECIPE } from '../../../redux/Recipe/actions';
import { CATEGORIES, DATE } from '../../../constants/global';
import { compose, withProps } from 'recompose';

const countMark = (date, recipesCalendarWithData) => {
  return recipesCalendarWithData.map(({ date: recipeDate, category }) => {
    if (equalDate(new Date(date), new Date(recipeDate))) return category;
  });
};

const Day = ({ isSelected, date, setSelectedDate, mark }) => (
  <TouchableOpacity
    style={[styles.wrapper, isSelected && styles.selectedDate]}
    onPress={() => setSelectedDate(date)}
  >
    <Text bold={isSelected} style={styles.text}>
      {DATE.shortDay[date.getDay()]}
    </Text>
    <Text bold={isSelected} style={styles.text}>
      {date.getDate()}
    </Text>
    <View style={{ flexDirection: 'row', marginTop: 7 }}>
      {CATEGORIES.map((category, i) => (
        <Mark isSelected={mark.includes(category.value)} key={i} />
      ))}
    </View>
  </TouchableOpacity>
);

const mapStateToProps = combineSelectors(selectedDateSelector, s =>
  recipesCalendarWithDataSelector(s[RECIPE].recipes)(s)
);

const mapDispatchToProps = dispatch => ({
  setSelectedDate: date => dispatch(setSelectedDate(date))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ selectedDate, date, recipesCalendarWithData }) => ({
    isSelected: equalDate(new Date(date), new Date(selectedDate)),
    mark: countMark(date, recipesCalendarWithData),
    date
  }))
)(Day);
