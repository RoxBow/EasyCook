import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import styles from './calendarscreen.style';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { serverUrl } from '../../constants/global';
import { calendar } from '../../constants/colors';
import RecipeCalendar from '../../components/RecipeCalendar/RecipeCalendar';

const { dotColor } = calendar;

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};

LocaleConfig.defaultLocale = 'fr';

const MEAL = {
  breakFast: { key: 'breakFast', color: dotColor, selectedDotColor: dotColor },
  lunch: { key: 'lunch', color: dotColor, selectedDotColor: dotColor },
  snack: { key: 'snack', color: dotColor, selectedDotColor: dotColor },
  dinner: { key: 'dinnerdot', color: dotColor, selectedDotColor: dotColor }
};

export default class AgendaScreen extends React.Component {
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

  onUpdateSelectedDate = date => {
    const { allDates } = this.state;
    const dates = allDates[date.dateString];

    this.setState({ items: { [date.dateString]: dates } });
  };

  renderDay(day, item) {
    return ;
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
        console.log(err);
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
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000',
          selectedDayBackgroundColor: 'rgba(81,216, 197, .2)',
          selectedDayTextColor: '#000',
          todayTextColor: '#000',
          dayTextColor: '#000',
          textDisabledColor: '#d9e1e8',
          dotColor,
          selectedDotColor: dotColor,
          monthTextColor: dotColor,
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    );
  }
}