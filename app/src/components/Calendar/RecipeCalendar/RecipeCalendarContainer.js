import React from 'react';
import { compose, branch, withProps, renderComponent } from 'recompose';
import RecipeCalendar from './RecipeCalendar';
import EmptyRecipe from '../EmptyRecipe/EmptyRecipe';
import { selectedDateSelector } from '../../../redux/Calendar/selectors';
import { combineSelectors, equalDate } from '../../../constants/helpers';
import { connect } from 'react-redux';

export default compose(
  connect(combineSelectors(selectedDateSelector)),
  withProps(({ recipes, selectedDate, category }) => ({
    ...recipes.find(
      ({ date, category: recipeCategory }) =>
        equalDate(new Date(date), new Date(selectedDate)) && recipeCategory === category
    ),
    category
  })),
  branch(
    ({ _id }) => !_id,
    renderComponent(({ category, labelCategory }) => (
      <EmptyRecipe category={category} labelCategory={labelCategory} />
    ))
  )
)(RecipeCalendar);
