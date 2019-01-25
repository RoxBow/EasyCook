import styles from './calendarscreen.style';
import React from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { serverUrl, styleDotCalendar, themeCalendar } from '../../constants/global';
import RecipeCalendar from '../../components/RecipeCalendar/RecipeCalendar';

const MEAL = {
  breakFast: { key: 'breakFast', ...styleDotCalendar },
  lunch: { key: 'lunch', ...styleDotCalendar },
  snack: { key: 'snack', ...styleDotCalendar },
  dinner: { key: 'dinnerdot', ...styleDotCalendar }
};

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onUpdateSelectedDate = this.onUpdateSelectedDate.bind(this);
    this.rowHasChanged = this.rowHasChanged.bind(this);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onUpdateSelectedDate(date) {
    const { allDates } = this.state;
    const dates = allDates[date.dateString];

    this.setState({ items: { [date.dateString]: dates } });
  }

  renderDay(day, item) {
    return;
  }

  renderKnob() {
    return (
      <Button rounded success>
        <Text>knob</Text>
      </Button>
    );
  }

  loadItems(day) {
    const { items } = this.state;

    // prevent second load (#bug)
    if (items) {
      return;
    }

    axios
      .get(`${serverUrl}/calendar`)
      .then(({ data }) => {
        this.setState({
          allDates: data
        });

        this.onUpdateSelectedDate(day);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  renderItem(item) {
    return <RecipeCalendar {...item} />;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
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
        dayLoading={true}
        items={items}
        onDayPress={date => this.onUpdateSelectedDate(date)}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderDay={this.renderDay.bind(this)}
        renderKnob={this.renderKnob.bind(this)}
        markedDates={{
          '2017-05-16': {
            dots: [MEAL.breakFast, MEAL.lunch, MEAL.snack, MEAL.dinner],
            marked: true
          }
        }}
        markingType={'multi-dot'}
        theme={{ ...themeCalendar,
          'stylesheet.calendar.header': {
            header: {
              height: 0
            },
            week: {
              height: 0
            }
          }}}
      />
    );
  }
}

export default CalendarScreen;
