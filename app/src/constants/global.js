import { tabBar, pink } from './colors';
import { LocaleConfig } from 'react-native-calendars';
import { Dimensions } from 'react-native';

const { tabBarSelected, textDefault, backgroundTab } = tabBar;

/**
 * CONFIG
 */

// export const serverUrl = 'http://localhost:3333';
export const serverUrl = 'http://10.1.241.10:3333';

export const STATUS = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
}

// Config wording calendar
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

/**
 *
 * COMPONENTS
 *
 */

export const styleTabs = {
  tabBarUnderlineStyle: { 
    backgroundColor: tabBarSelected, 
    width: "30%", 
    marginHorizontal: Dimensions.get('window').width / 10 
  }
};

export const styleTab = {
  textStyle: { color: textDefault, fontWeight: '600' },
  activeTextStyle: { backgroundColor: backgroundTab, color: tabBarSelected },
  tabStyle: { backgroundColor: backgroundTab },
  activeTabStyle: { backgroundColor: backgroundTab }
};

/* # CALENDAR # */
export const styleDotCalendar = {
  color: pink,
  selectedDotColor: pink
};

export const themeCalendar = {
  backgroundColor: '#fff',
  calendarBackground: '#fff',
  textSectionTitleColor: '#000',
  selectedDayBackgroundColor: 'rgba(81,216, 197, .2)',
  selectedDayTextColor: '#000',
  todayTextColor: '#000',
  dayTextColor: '#000',
  textDisabledColor: '#d9e1e8',
  dotColor: pink,
  selectedDotColor: pink,
  monthTextColor: pink,
  textMonthFontWeight: 'bold',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};

export const tabBarIcon = {
  discover: {
    normal: require('../assets/images/tabBar/discover.png'),
    focus: require('../assets/images/tabBar/discover_focus.png')
  },
  recipes: {
    normal: require('../assets/images/tabBar/recipes.png'),
    focus: require('../assets/images/tabBar/recipes_focus.png')
  },
  calendar: {
    normal: require('../assets/images/tabBar/calendar.png'),
    focus: require('../assets/images/tabBar/calendar_focus.png')
  },
  list: {
    normal: require('../assets/images/tabBar/list.png'),
    focus: require('../assets/images/tabBar/list_focus.png')
  },
  account: {
    normal: require('../assets/images/tabBar/account.png'),
    focus: require('../assets/images/tabBar/account_focus.png')
  }
};
