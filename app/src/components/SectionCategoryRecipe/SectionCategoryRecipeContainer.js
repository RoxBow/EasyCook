import SectionCategoryRecipe from './SectionCategoryRecipe';
import { compose, branch, renderNothing } from 'recompose';
import { connect } from 'react-redux';
import { recipesSelector } from '../../redux/Recipe/selectors';

export default compose(
  connect(recipesSelector),
  branch(
    ({ recipes, category, isSuggestion }) =>
      !recipes.some(({ category: c }) => c === category) && !isSuggestion,
    renderNothing
  )
)(SectionCategoryRecipe);
