import React from 'react';
import { Text } from 'react-native';
import { Container, Tabs, Tab } from 'native-base';
import styles from './calendarscreen.style';
import Test from '../../components/Test/Test';
import { tabBar } from '../../constants/colors';

const { tabBarSelected, textDefault, backgroundTab } = tabBar;

const styleTab = {
  textStyle: { color: textDefault },
  activeTextStyle: { backgroundColor: backgroundTab, color: tabBarSelected },
  tabStyle: { backgroundColor: backgroundTab },
  activeTabStyle: { backgroundColor: backgroundTab }
};

class CalendarScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }}>
          <Tab heading="Événements culinaires" {...styleTab} />
          <Tab heading="Bons plans" {...styleTab} />
        </Tabs>
        <Text>Bonsoir</Text>
        <Test />
      </Container>
    );
  }
}

export default CalendarScreen;
