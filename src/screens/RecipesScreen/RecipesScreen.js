import styles from './recipesscreen.style';
import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'native-base';
import { tabBar } from '../../constants/colors';
import { serverUrl, styleTab } from '../../constants/global';
import ThumbnailList from '../../components/ThumbnailList/ThumbnailList';

const { tabBarSelected } = tabBar;

class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  componentDidMount() {
    axios
      .get(`${serverUrl}/ingredients`)
      .then(({ data }) => {
        this.setState({
          ingredients: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { ingredients } = this.state;

    return (
      <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }} locked={true}>
        <Tab heading="Toutes les recettes" {...styleTab}>
          {ingredients && <ThumbnailList title="Ingrédients de saison" list={ingredients} />}
          {ingredients && <ThumbnailList title="La communauté" list={ingredients} />}
        </Tab>
        <Tab heading="Mon frigo" {...styleTab}>
          {ingredients && <ThumbnailList title="Dans mon frigo" list={ingredients} />}
        </Tab>
      </Tabs>
    );
  }
}

export default RecipesScreen;
