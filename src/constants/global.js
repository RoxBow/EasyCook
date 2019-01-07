import { tabBar } from './colors';
const { tabBarSelected, textDefault, backgroundTab } = tabBar;

/**
 * CONFIG
 */
export const serverUrl = "http://localhost:3333";

/**
 * COMPONENTS
 */

export const styleTab = {
  textStyle: { color: textDefault, fontWeight: '600' },
  activeTextStyle: { backgroundColor: backgroundTab, color: tabBarSelected },
  tabStyle: { backgroundColor: backgroundTab },
  activeTabStyle: { backgroundColor: backgroundTab }
};