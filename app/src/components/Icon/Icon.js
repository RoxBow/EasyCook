import React from 'react';
import Svg from 'react-native-svg-uri';

/* Logo */
const MainLogo = require('../../assets/images/logo/main-logo.svg');
const SecondLogo = require('../../assets/images/logo/second-logo.svg');

/* Icons TabBar */
const AgendaTabBar = require('../../assets/images/tabBar/agenda.svg');
const AgendaTabBarFocus = require('../../assets/images/tabBar/agenda--focus.svg');
const DiscoverTabBar = require('../../assets/images/tabBar/discover.svg');
const DiscoverTabBarFocus = require('../../assets/images/tabBar/discover--focus.svg');
const RecipeTabBar = require('../../assets/images/tabBar/recipe.svg');
const RecipeTabBarFocus = require('../../assets/images/tabBar/recipe--focus.svg');
const AccountTabBar = require('../../assets/images/tabBar/account.svg');
const AccountTabBarFocus = require('../../assets/images/tabBar/account--focus.svg');
const ListTabBar = require('../../assets/images/tabBar/list.svg');
const ListTabBarFocus = require('../../assets/images/tabBar/list--focus.svg');

/* Icons Food */
const Meat = require('../../assets/images/food/meat.svg');
const Fish = require('../../assets/images/food/fish.svg');
const Salt = require('../../assets/images/food/salt.svg');
const Fruit = require('../../assets/images/food/fruit.svg');
const Vegetable = require('../../assets/images/food/vegetable.svg');
const Cheese = require('../../assets/images/food/cheese.svg');

const MeatPink = require('../../assets/images/food/meat--pink.svg');
const FishPink = require('../../assets/images/food/fish--pink.svg');
const SaltPink = require('../../assets/images/food/salt--pink.svg');
const FruitPink = require('../../assets/images/food/fruit--pink.svg');
const VegetablePink = require('../../assets/images/food/vegetable--pink.svg');
const CheesePink = require('../../assets/images/food/cheese--pink.svg');

const MeatWhite = require('../../assets/images/food/meat--white.svg');
const FishWhite = require('../../assets/images/food/fish--white.svg');
const SaltWhite = require('../../assets/images/food/salt--white.svg');
const FruitWhite = require('../../assets/images/food/fruit--white.svg');
const VegetableWhite = require('../../assets/images/food/vegetable--white.svg');
const CheeseWhite = require('../../assets/images/food/cheese--white.svg');

/* Icons Equipments */
const Poele = require('../../assets/images/equipments/poele.svg');
const Cuisson = require('../../assets/images/equipments/cuisson.svg');

/* Icons */
const Star = require('../../assets/images/star.svg');
const StarFill = require('../../assets/images/star--fill.svg');
const Heart = require('../../assets/images/heart.svg');
const HeartFill = require('../../assets/images/heart--fill.svg');
const AddUser = require('../../assets/images/addUser.svg');
const Location = require('../../assets/images/location.svg');
const Price = require('../../assets/images/price.svg');
const Search = require('../../assets/images/search.svg');
const Logout = require('../../assets/images/logout.svg');
const DeleteAccount = require('../../assets/images/delete_account.svg');
const Setting = require('../../assets/images/setting.svg');
const Notification = require('../../assets/images/notification.svg');
const Picture = require('../../assets/images/picture.svg');
const Cross = require('../../assets/images/plus.svg');
const CrossWhite = require('../../assets/images/plus--white.svg');
const CrossRounded = require('../../assets/images/cross_rounded.svg');
const PlusRounded = require('../../assets/images/plus_rounded.svg');
const ArrowBack = require('../../assets/images/arrow_back.svg');
const ArrowBackWhite = require('../../assets/images/arrow_back--white.svg');
const Edit = require('../../assets/images/edit.svg');
const Detail = require('../../assets/images/detail.svg');
const CalendarAdd = require('../../assets/images/add-recipe-calendar.svg');
const ThumbUp = require('../../assets/images/thumb-up.svg');
const ThumbDown = require('../../assets/images/thumb-down.svg');
const Favorite = require('../../assets/images/favorite.svg');
const ArrowSelectWhite = require('../../assets/images/arrow_select--white.svg');
const Geolocation = require('../../assets/images/geolocation.svg');
const IconDate = require('../../assets/images/date.svg');
const Equipment = require('../../assets/images/equipment.svg');
const CookingTime = require('../../assets/images/cookingTime.svg');
const PreparationTime = require('../../assets/images/preparationTime.svg');
const Toque = require('../../assets/images/toque.svg');
const Category = require('../../assets/images/category.svg');
const Fridge = require('../../assets/images/fridge.svg');
const Publication = require('../../assets/images/publication.svg');
const ChevronSelect = require('../../assets/images/chevron_select.svg');
const ChevronSelectPink = require('../../assets/images/chevron_select--pink.svg');
const ChevronSelectWhite = require('../../assets/images/chevron_select--white.svg');
const ArrowChange = require('../../assets/images/arrow_change.svg');
const MentionLegal = require('../../assets/images/mention-legal.svg');
const About = require('../../assets/images/about.svg');
const Help = require('../../assets/images/help.svg');
const Check = require('../../assets/images/participation.svg');
const CheckFill = require('../../assets/images/participation--fill.svg');

const Icon = ({ icon, width, size, height, style }) => {
  (width = width || size), (height = height || size);

  icon = icon
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const config = {
    width,
    height,
    style: { ...style, overflow: 'hidden' }
  };

  switch (icon) {
    case 'main_logo':
      return <Svg source={MainLogo} {...config} />;
    case 'second_logo':
      return <Svg source={SecondLogo} {...config} />;
    case 'agenda_tab':
      return <Svg source={AgendaTabBar} {...config} />;
    case 'agenda_tab--focus':
      return <Svg source={AgendaTabBarFocus} {...config} />;
    case 'discover_tab':
      return <Svg source={DiscoverTabBar} {...config} />;
    case 'discover_tab--focus':
      return <Svg source={DiscoverTabBarFocus} {...config} />;
    case 'recipe_tab':
      return <Svg source={RecipeTabBar} {...config} />;
    case 'recipe_tab--focus':
      return <Svg source={RecipeTabBarFocus} {...config} />;
    case 'account_tab':
      return <Svg source={AccountTabBar} {...config} />;
    case 'account_tab--focus':
      return <Svg source={AccountTabBarFocus} {...config} />;
    case 'list_tab':
      return <Svg source={ListTabBar} {...config} />;
    case 'list_tab--focus':
      return <Svg source={ListTabBarFocus} {...config} />;
    case 'meat':
      return <Svg source={Meat} {...config} />;
    case 'fish':
      return <Svg source={Fish} {...config} />;
    case 'cheese':
      return <Svg source={Cheese} {...config} />;
    case 'salt':
    case 'spice':
      return <Svg source={Salt} {...config} />;
    case 'fruit':
      return <Svg source={Fruit} {...config} />;
    case 'vegetable':
    case 'ingredient':
      return <Svg source={Vegetable} {...config} />;
    case 'meat--white':
      return <Svg source={MeatWhite} {...config} />;
    case 'fish--white':
      return <Svg source={FishWhite} {...config} />;
    case 'cheese--white':
      return <Svg source={CheeseWhite} {...config} />;
    case 'spice--white':
      return <Svg source={SaltWhite} {...config} />;
    case 'fruit--white':
      return <Svg source={FruitWhite} {...config} />;
    case 'vegetable--white':
      return <Svg source={VegetableWhite} {...config} />;
    case 'meat--pink':
      return <Svg source={MeatPink} {...config} />;
    case 'fish--pink':
      return <Svg source={FishPink} {...config} />;
    case 'cheese--pink':
      return <Svg source={CheesePink} {...config} />;
    case 'spice--pink':
      return <Svg source={SaltPink} {...config} />;
    case 'fruit--pink':
      return <Svg source={FruitPink} {...config} />;
    case 'vegetable--pink':
      return <Svg source={VegetablePink} {...config} />;
    case 'star':
      return <Svg source={Star} {...config} />;
    case 'star--fill':
      return <Svg source={StarFill} {...config} />;
    case 'add_user':
      return <Svg source={AddUser} {...config} />;
    case 'location':
      return <Svg source={Location} {...config} />;
    case 'calendar':
      return <Svg source={Calendar} {...config} />;
    case 'price':
      return <Svg source={Price} {...config} />;
    case 'search':
      return <Svg source={Search} {...config} />;
    case 'logout':
      return <Svg source={Logout} {...config} />;
    case 'delete_account':
      return <Svg source={DeleteAccount} {...config} />;
    case 'setting':
      return <Svg source={Setting} {...config} />;
    case 'notification':
    case 'bell':
      return <Svg source={Notification} {...config} />;
    case 'picture':
      return <Svg source={Picture} {...config} />;
    case 'heart':
      return <Svg source={Heart} {...config} />;
    case 'heart--fill':
      return <Svg source={HeartFill} {...config} />;
    case 'plus':
      return <Svg source={Cross} {...config} />;
    case 'plus_rounded':
      return <Svg source={PlusRounded} {...config} />;
    case 'plus--white':
      return <Svg source={CrossWhite} {...config} />;
    case 'cross':
      return <Svg source={Cross} {...config} style={{ transform: [{ rotate: '45deg' }] }} />;
    case 'cross_rounded':
      return <Svg source={CrossRounded} {...config} style={{ transform: [{ rotate: '45deg' }] }} />;
    case 'arrow_back':
      return <Svg source={ArrowBack} {...config} />;
    case 'arrow_back--white':
      return <Svg source={ArrowBackWhite} {...config} />;
    case 'edit':
      return <Svg source={Edit} {...config} />;
    case 'poele':
      return <Svg source={Poele} {...config} />;
    case 'cuisson':
      return <Svg source={Cuisson} {...config} />;
    case 'detail':
      return <Svg source={Detail} {...config} />;
    case 'calendar_add':
      return <Svg source={CalendarAdd} {...config} />;
    case 'thumb_up':
      return <Svg source={ThumbUp} {...config} />;
    case 'thumb_down':
      return <Svg source={ThumbDown} {...config} />;
    case 'arrow_select--white':
      return <Svg source={ArrowSelectWhite} {...config} />;
    case 'favorite':
      return <Svg source={Favorite} {...config} />;
    case 'geolocation':
      return <Svg source={Geolocation} {...config} />;
    case 'date':
      return <Svg source={IconDate} {...config} />;
    case 'equipment':
      return <Svg source={Equipment} {...config} />;
    case 'cooking_time':
      return <Svg source={CookingTime} {...config} />;
    case 'preparation_time':
      return <Svg source={PreparationTime} {...config} />;
    case 'difficulty':
      return <Svg source={Toque} {...config} />;
    case 'category':
      return <Svg source={Category} {...config} />;
    case 'fridge':
      return <Svg source={Fridge} {...config} />;
    case 'publication':
      return <Svg source={Publication} {...config} />;
    case 'chevron_select':
      return <Svg source={ChevronSelect} {...config} />;
    case 'chevron_select--pink':
      return <Svg source={ChevronSelectPink} {...config} />;
    case 'chevron_select--white':
      return <Svg source={ChevronSelectWhite} {...config} />;
    case 'arrow_change':
      return <Svg source={ArrowChange} {...config} />;
    case 'legal_mention':
      return <Svg source={MentionLegal} {...config} />;
    case 'about':
      return <Svg source={About} {...config} />;
    case 'help':
      return <Svg source={Help} {...config} />;
    case 'check':
      return <Svg source={Check} {...config} />;
    case 'check--fill':
      return <Svg source={CheckFill} {...config} />;
  }
  return null;
};

export const LIST_SVG = [
  AgendaTabBar,
  AgendaTabBarFocus,
  DiscoverTabBar,
  DiscoverTabBarFocus,
  RecipeTabBar,
  RecipeTabBarFocus,
  AccountTabBar,
  AccountTabBarFocus,
  ListTabBar,
  ListTabBarFocus,
  Star,
  StarFill,
  Heart,
  HeartFill,
  AddUser,
  Location,
  Price,
  Search,
  Logout,
  DeleteAccount,
  Setting,
  Notification,
  Picture,
  Cross,
  CrossWhite,
  CrossRounded,
  PlusRounded,
  ArrowBack,
  Edit,
  Detail,
  CalendarAdd,
  ThumbUp,
  ThumbDown,
  Favorite,
  ArrowSelectWhite,
  Geolocation,
  IconDate,
  Equipment,
  CookingTime,
  PreparationTime,
  Toque,
  Category,
  Fridge,
  Publication,
  ChevronSelect,
  ChevronSelectPink,
  ChevronSelectWhite,
  Meat,
  Fish,
  Salt,
  Fruit,
  Vegetable,
  Cheese,
  MeatPink,
  FishPink,
  SaltPink,
  FruitPink,
  VegetablePink,
  CheesePink,
  MeatWhite,
  FishWhite,
  SaltWhite,
  FruitWhite,
  VegetableWhite,
  CheeseWhite
];

export default Icon;
