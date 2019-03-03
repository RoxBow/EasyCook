import styles from './SuggestionRecipe.style';
import React from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';

class SuggestionRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToRecipeItemScreen = this.redirectToRecipeItemScreen.bind(this);
  }

  redirectToRecipeItemScreen() {
    const { _id } = this.props;

    this.props.navigation.navigate('RecipeItem', {
      idRecipe: _id
    });
  }

  render() {
    const { category, image, name } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.redirectToRecipeItemScreen}>
        <ImageBackground
          source={{ uri: `${serverUrl}/${image.uri}` }}
          style={{ width: '100%', height: '100%', borderRadius: 15, overflow: 'hidden' }}
        >
          <View style={styles.wrapperText}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.nameRecipe} medium>
              {name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(SuggestionRecipe);
