import styles from './FridgeIngredientScreen.style';
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import FridgeIngredient from '../../../components/FrigeIngredient/FridgeIngredient';
import { KIND_INGREDIENTS } from '../../../constants/global';
import { refDataSelector } from '../../../redux/Recipe/selectors';
import { pink } from '../../../constants/colors';

class FridgeIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKind: 'fruit'
    };

    this.selectKind = this.selectKind.bind(this);
  }

  selectKind(kind) {
    this.setState({
      selectedKind: kind
    });
  }

  render() {
    const { selectedKind } = this.state;
    const { refIngredients } = this.props;

    return (
      <View>
        <ScrollView horizontal>
          {KIND_INGREDIENTS.map(({ label, value }, i) => (
            <TouchableOpacity
              onPress={() => this.selectKind(value)}
              style={[{ alignItems: 'center', marginRight: 20 }, selectedKind === value && { borderBottomColor: pink, borderBottomWidth: 2} ]}
              key={i}
            >
              <Icon icon={value} size={22} />
              <Text>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ backgroundColor: 'lightgrey' }}>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 15,
              alignSelf: 'center',
              width: '70%',
              textAlign: 'center'
            }}
            medium
          >
            Appuyer sur les aliments disponibles dans votre frigo
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginHorizontal: 15
            }}
          >
            {refIngredients
              .filter(ingredient => ingredient.kind === selectedKind)
              .map((ingredient, i) => (
                <FridgeIngredient {...ingredient} key={i} />
              ))}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(refDataSelector)(FridgeIngredientScreen);
