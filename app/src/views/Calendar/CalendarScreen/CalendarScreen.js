import styles from './calendarscreen.style';
import React from 'react';
import Calendar from '../../../components/Calendar/Calendar/CalendarContainer';
import { View } from 'react-native';
import { fetchRecipes } from '../../../redux/Recipe/actions';
import { recipesSelector } from '../../../redux/Recipe/selectors';
import { fetchCalendar } from '../../../redux/Calendar/actions';
import { recipesCalendarSelector } from '../../../redux/Calendar/selectors';
import { combineSelectors } from '../../../constants/helpers';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

class CalendarScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRecipes();
    this.props.fetchCalendar();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Calendar />
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(recipesSelector, recipesCalendarSelector);

const mapDispatchToProps = dispatch => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  fetchCalendar: () => dispatch(fetchCalendar())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(
    ({ recipes, recipesCalendar }) => !recipes.length && !recipesCalendar.length,
    renderNothing
  )
)(CalendarScreen);
