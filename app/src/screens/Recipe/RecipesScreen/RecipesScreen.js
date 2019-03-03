import styles from './recipesscreen.style';
import React from 'react';
import { Tabs, Tab, Button, Text } from 'native-base';
import { styleTab, styleTabs } from '../../../constants/global';
import FridgeTab from '../../../components/FridgeTab/FridgeTab';
import RecipeTab from '../../../components/RecipeTab/RecipeTab';
import { fetchRecipes } from '../../../redux/Recipe/actions';
import { connect } from 'react-redux';

class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    const { navigation } = this.props;

    return (
      <Tabs {...styleTabs} locked={true}>
        <Tab heading="Toutes les recettes" {...styleTab}>
          <Button success onPress={() => navigation.navigate('CreateRecipe')}>
            <Text>Créer recette</Text>
          </Button>
          <RecipeTab />
        </Tab>
        <Tab heading="Mon frigo" {...styleTab}>
          <FridgeTab />
        </Tab>
      </Tabs>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecipes: () => dispatch(fetchRecipes())
});

export default connect(
  null,
  mapDispatchToProps
)(RecipesScreen);
