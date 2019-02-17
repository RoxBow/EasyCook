import React from 'react';
import Svg from 'react-native-svg-uri';

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

/* Icons */
const Star = require('../../assets/images/star.svg');
const StarFill = require('../../assets/images/star--fill.svg');
const AddUser = require('../../assets/images/addUser.svg');
const Location = require('../../assets/images/location.svg');
const Calendar = require('../../assets/images/calendar.svg');
const Price = require('../../assets/images/price.svg');
const Search = require('../../assets/images/search.svg');
const Logout = require('../../assets/images/logout.svg');
const DeleteAccount = require('../../assets/images/delete_account.svg');
const Setting = require('../../assets/images/setting.svg');
const Notification = require('../../assets/images/notification.svg');
const Picture = require('../../assets/images/picture.svg');
const Cross = require('../../assets/images/plus.svg');
const CrossWhite = require('../../assets/images/plus--white.svg');
const CrossRounded = require('../../assets/images/plus_rounded.svg');
const ArrowBack = require('../../assets/images/arrow_back.svg');

const Icon = ({ icon, width, size, height, style }) => {

    width = width || size,
    height = height || size;

    const config = {
        width,
        height,
        style,
    };

    switch (icon) {
        case 'agenda_tabBar':
            return <Svg source={AgendaTabBar} {...config} />;
        case 'agenda_tabBar--focus':
            return <Svg source={AgendaTabBarFocus} {...config} />;
        case 'discover_tabBar':
            return <Svg source={DiscoverTabBar} {...config} />;
        case 'discover_tabBar--focus':
            return <Svg source={DiscoverTabBarFocus} {...config} />;
        case 'recipe_tabBar':
            return <Svg source={RecipeTabBar} {...config} />;
        case 'recipe_tabBar--focus':
            return <Svg source={RecipeTabBarFocus} {...config} />;
        case 'account_tabBar':
            return <Svg source={AccountTabBar} {...config} />;
        case 'account_tabBar--focus':
            return <Svg source={AccountTabBarFocus} {...config} />;
        case 'list_tabBar':
            return <Svg source={ListTabBar} {...config} />;
        case 'list_tabBar--focus':
            return <Svg source={ListTabBarFocus} {...config} />;
        case 'meat':
            return <Svg source={Meat} {...config} />;
        case 'fish':
            return <Svg source={Fish} {...config} />;
        case 'cheese':
            return <Svg source={Cheese} {...config} />;
        case 'salt':
            return <Svg source={Salt} {...config} />;
        case 'fruit':
            return <Svg source={Fruit} {...config} />;
        case 'vegetable':
            return <Svg source={Vegetable} {...config} />;
        case 'star':
            return <Svg source={Star} {...config} />;
        case 'star--fill':
            return <Svg source={StarFill} {...config} />;
        case 'addUser':
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
        case 'deleteAccount':
            return <Svg source={DeleteAccount} {...config} />;
        case 'setting':
            return <Svg source={Setting} {...config} />;
        case 'notification':
            return <Svg source={Notification} {...config} />;
        case 'picture':
            return <Svg source={Picture} {...config} />;
        case 'plus':
            return <Svg source={Cross} {...config} />;
        case 'plus--white':
            return <Svg source={CrossWhite} {...config} />;
        case 'cross':
            return <Svg source={Cross} {...config} style={{ transform: [{ rotate: '45deg'}] }} />;
        case 'crossRounded':
            return <Svg source={CrossRounded} {...config} style={{ transform: [{ rotate: '45deg'}] }} />;
        case 'arrowBack':
            return <Svg source={ArrowBack} {...config} />;
    }
    return null;
};

export default Icon;
