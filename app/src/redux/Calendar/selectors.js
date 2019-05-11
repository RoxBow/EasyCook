import { compose } from 'recompose';
import { CALENDAR } from './actions';

const stateSelector = state => state[CALENDAR];

export const recipesCalendarSelector = compose(
  ({ recipes }) => ({ recipesCalendar: recipes }),
  stateSelector
);

export const selectedDateSelector = compose(
  ({ selectedDate }) => ({ selectedDate }),
  stateSelector
);

export const recipesCalendarWithDataSelector = recipes =>
  compose(
    recipesCalendarWithData => ({ recipesCalendarWithData: recipesCalendarWithData || [] }),
    ({ recipesCalendar }) =>
      recipesCalendar.map(recipe => {
        const recipeFind = recipes.find(
          ({ _id }) => _id.toString() === recipe.refRecipe.toString()
        );

        if(!recipeFind) return

        return {
          ...recipe,
          name: recipeFind.name,
          image: recipeFind.image,
          category: recipeFind.category,
          averageRating: recipeFind.averageRating
        };
      }),
    recipesCalendarSelector
  );
