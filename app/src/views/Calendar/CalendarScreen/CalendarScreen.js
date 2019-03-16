import styles from './calendarscreen.style';
import React from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { styleDotCalendar, themeCalendar, CATEGORIES } from '../../../constants/global';
import RecipeCalendar from '../../../components/RecipeCalendar/RecipeCalendar';
import EmptyRecipe from '../../../components/EmptyRecipe/EmptyRecipe';
import Text from '../../../components/Text/Text';
import { fetchCalendar } from '../../../redux/Calendar/actions';
import { fetchRecipes } from '../../../redux/Recipe/actions';
import { recipesCalendarSelector } from '../../../redux/Calendar/selectors';
import { recipesSelector } from '../../../redux/Recipe/selectors';
import { connect } from 'react-redux';
import { combineSelectors, equalDate } from '../../../constants/helpers';
import { compose } from 'recompose';

const MEAL = {
  breakFast: { key: 'breakFast', ...styleDotCalendar },
  lunch: { key: 'lunch', ...styleDotCalendar },
  snack: { key: 'snack', ...styleDotCalendar },
  dinner: { key: 'dinnerdot', ...styleDotCalendar },
  empty: { key: 'empty', color: 'lightgrey', selectedDotColor: 'lightgrey' }
};

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onUpdateSelectedDate = this.onUpdateSelectedDate.bind(this);
    this.rowHasChanged = this.rowHasChanged.bind(this);
  }

  componentDidMount() {
    this.props.fetchCalendar();
    this.props.fetchRecipes();
  }

  onUpdateSelectedDate(date) {
    const { recipesCalendar, recipes } = this.props;

    let templateResult = CATEGORIES.map(({ label, value }) => ({
      labelCategory: label,
      category: value
    }));

    let results = [];

    const recipesOfTheDay = recipesCalendar.filter(recipe =>
      equalDate(new Date(recipe.date), new Date(date.timestamp))
    );

    const recipesOfTheDayFormat = recipesOfTheDay.map(recipe => {
      const recipeFind = recipes.find(({ _id }) => _id.toString() === recipe.refRecipe.toString());
      
      return {
        ...recipe,
        name: recipeFind.name,
        image: recipeFind.image,
        category: recipeFind.category,
        averageRating: recipeFind.averageRating
      };
    });

    for (let i = 0; i < templateResult.length; i++) {
      results[i] = { ...templateResult[i], ...recipesOfTheDayFormat[i] };
    }

    this.setState({ items: { [date.dateString]: results || []} });
  }

  renderDay(day, item) {
    // render nothing to keep all place for renderItems
    return;
  }

  renderKnob() {
    return <View style={{ borderBottomColor: 'grey', borderBottomWidth: 4, width: 30 }} />;
  }

  loadItemsForMonth(day) {
    const { items } = this.state;
  }

  renderItem(item) {
    if (item._id) {
      return <RecipeCalendar {...item} />;
    }

    return <EmptyRecipe category={item.category} labelCategory={item.labelCategory} />;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Rien de prévu</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  render() {
    const { items } = this.state;

    return (
      <Agenda
        minDate={new Date()}
        selected={new Date()}
        dayLoading={true}
        items={items}
        onDayPress={date => this.onUpdateSelectedDate(date)}
        loadItemsForMonth={this.loadItemsForMonth.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderDay={this.renderDay.bind(this)}
        renderKnob={this.renderKnob.bind(this)}
        pastScrollRange={6}
        futureScrollRange={12}
        markedDates={{
          [new Date().toISOString().split('T')[0]]: {
            dots: [MEAL.breakFast, MEAL.lunch, MEAL.snack, MEAL.empty],
            marked: false
          },
          '2017-05-16': {
            dots: [MEAL.breakFast, MEAL.lunch, MEAL.snack, MEAL.empty],
            marked: false
          }
        }}
        markingType={'multi-dot'}
        theme={{ ...themeCalendar }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCalendar: () => dispatch(fetchCalendar()),
  fetchRecipes: () => dispatch(fetchRecipes())
});

const mapStateToProps = combineSelectors(recipesCalendarSelector, recipesSelector);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CalendarScreen);
