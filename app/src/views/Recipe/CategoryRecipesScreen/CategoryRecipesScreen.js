import styles from './CategoryRecipesScreen.style';
import React from 'react';
import { ScrollView } from 'react-native';
import RecipeItem from '../../../components/RecipeItem/RecipeItem';
import { categoryRecipesSelector } from '../../../redux/Recipe/selectors';
import { connect } from 'react-redux';

class CategoryRecipesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { recipes } = this.props;

    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 15
        }}
      >
        {recipes.map((recipe, i) => (
          <RecipeItem {...recipe} key={i} style={styles.recipe} />
        ))}
      </ScrollView>
    );
  }
}

export default connect((s, { navigation }) =>
  categoryRecipesSelector(navigation.state.params.category)(s)
)(CategoryRecipesScreen);
