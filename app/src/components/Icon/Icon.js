import React from 'react';
import Svg from 'react-native-svg-uri';

/* Icons */
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

const Icon = ({ icon, width, height, style }) => {

    width = width || 100;
    height = height || 100;

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
    }
    return null;
};

export default Icon;