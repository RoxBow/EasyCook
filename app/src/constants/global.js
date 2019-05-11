import { tabBar, pink } from './colors';
import { Dimensions } from 'react-native';

const { tabBarSelected, textDefault, backgroundTab } = tabBar;

/**
 * CONFIG
 */

export const serverUrl = 'http://localhost:3333';
// export const serverUrl = 'https://app-easy-cook.herokuapp.com/';

export const STATUS = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export const DATE = {
  month: [
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
  shortMonth: [
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
  day: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  shortDay: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
};

export const mainFont = 'Quicksand';
export const mainFontMedium = 'Quicksand--medium';
export const mainFontBold = 'Quicksand--bold';

/**
 *
 * COMPONENTS
 *
 */

export const styleTabs = {
  tabBarUnderlineStyle: {
    backgroundColor: tabBarSelected,
    width: '40%',
    marginHorizontal: Dimensions.get('window').width / 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
};

export const styleTab = {
  textStyle: { color: textDefault, fontFamily: 'Quicksand--medium' },
  activeTextStyle: {
    backgroundColor: backgroundTab,
    color: tabBarSelected,
    fontFamily: 'Quicksand--bold',
    fontWeight: null
  },
  tabStyle: { backgroundColor: backgroundTab },
  activeTabStyle: { backgroundColor: backgroundTab }
};

/* # CALENDAR # */
export const styleDotCalendar = {
  color: pink,
  selectedDotColor: pink
};

export const themeCalendar = {
  backgroundColor: 'lightgrey',
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
  textDayHeaderFontSize: 16
};

export const styleTabBarIcon = {
  width: 22,
  height: 22,
  style: {
    marginBottom: -2
  }
};

export const ARROW = {
  LEFT: 'ios-arrow-back',
  BOTTOM: 'ios-arrow-down',
  RIGHT: 'ios-arrow-forward',
  TOP: 'ios-arrow-up'
};

export const LEVELS = [
  {
    label: 'Débutant',
    value: 'beginner'
  },
  {
    label: 'Amateur',
    value: 'amateur'
  },
  {
    label: 'Expert',
    value: 'master'
  }
];

export const CATEGORIES = [
  {
    label: 'Petit déjeuner',
    value: 'breakfast'
  },
  {
    label: 'Déjeuner',
    value: 'lunch'
  },
  {
    label: 'Goûter',
    value: 'collation'
  },
  {
    label: 'Dîner',
    value: 'dinner'
  }
];

export const UNITS = [
  {
    label: 'gramme',
    value: 'gram'
  },
  {
    label: 'pièce',
    value: 'piece'
  }
];

export const KIND_INGREDIENTS = [
  {
    label: 'Légumes',
    value: 'vegetable'
  },
  {
    label: 'Fruits',
    value: 'fruit'
  },
  {
    label: 'Fromages',
    value: 'cheese'
  },
  {
    label: 'Viandes',
    value: 'meat'
  },
  {
    label: 'Poissons',
    value: 'fish'
  },
  {
    label: 'Arômates',
    value: 'spice'
  }
];

export const DATE_SELECT = DATE.month.map(month => ({
  label: month,
  value: month
}));
