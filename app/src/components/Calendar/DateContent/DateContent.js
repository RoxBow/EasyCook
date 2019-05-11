import React from 'react';
import { View } from 'react-native';
import RecipeCalendar from '../RecipeCalendar/RecipeCalendarContainer';
import { CATEGORIES } from '../../../constants/global';

const DateContent = ({ recipesCalendarWithData }) => (
  <View style={{ paddingTop: 20, backgroundColor: '#F5F8F7', minHeight: '100%' }}>
    {CATEGORIES.map(({ label, value }) => (
      <RecipeCalendar
        labelCategory={label}
        category={value}
        recipes={recipesCalendarWithData}
        key={value}
      />
    ))}
  </View>
);

export default DateContent;
