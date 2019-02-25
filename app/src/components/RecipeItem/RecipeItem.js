import styles from './RecipeItem.style';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';

class RecipeItem extends React.Component {
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
    const { category, creator, image, name } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.redirectToRecipeItemScreen}>
        <View style={styles.wrapperImage}>
          <Image style={styles.image} source={{ uri: `${serverUrl}/${image.uri}` }} />
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.nameRecipe} medium>{name}</Text>
          <Text style={styles.username}>par {creator.username}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(RecipeItem);
