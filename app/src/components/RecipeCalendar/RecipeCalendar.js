import styles from './recipecalendar.style';
import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { serverUrl } from '../../constants/global';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { withNavigation } from 'react-navigation';
import RecipeRate from '../RecipeRate/RecipeRate';

const RecipeCalendar = ({ name, image, category, navigation, refRecipe, averageRating }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      style={styles.wrapperText}
      onPress={() => navigation.navigate('RecipeItem', { idRecipe: refRecipe })}
    >
      <View>
        <RecipeRate rate={averageRating} style={{ top: '65%', right: 0 }} />
        <Image style={styles.thumbnail} source={{ uri: `${serverUrl}/${image.uri}` }} />
      </View>
      <View>
        <Text style={styles.textCategory}>{category}</Text>
        <Text style={{ fontSize: 18 }}>{name}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.wrapperChange}
      onPress={() => navigation.navigate('CategoryRecipes', { category })}
    >
      <Icon icon="plus" size={18} />
      <Text style={styles.textChange}>Changer</Text>
    </TouchableOpacity>
  </View>
);

export default withNavigation(RecipeCalendar);
