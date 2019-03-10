import { createBottomTabNavigator } from 'react-navigation';
import { pink } from '../constants/colors'

/* # STACK # */
import RecipesStack from './RecipeStack';
import DiscoverStack from './DiscoverStack';
import ListShoppingListStack from './ListShoppingListStack';
import AccountStack from './AccountStack';
import CalendarStack from './CalendarStack';

export default createBottomTabNavigator(
  {
    DiscoverStack,
    RecipesStack,
    CalendarStack,
    ListShoppingListStack,
    AccountStack
  },
  {
    initialRouteName: 'RecipesStack',
    tabBarOptions: {
      activeTintColor: pink,
      inactiveTintColor: '#888',
      labelStyle: { 
        fontFamily: 'Quicksand'
      }
    }
  }
);
