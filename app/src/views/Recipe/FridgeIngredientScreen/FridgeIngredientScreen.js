import styles from './FridgeIngredientScreen.style';
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import FridgeIngredient from '../../../components/FrigeIngredient/FridgeIngredient';
import { KIND_INGREDIENTS } from '../../../constants/global';
import { refDataSelector } from '../../../redux/Recipe/selectors';
import { fridgeSelector } from '../../../redux/User/selectors';
import { saveFridge } from '../../../redux/User/actions';
import { combineSelectors, addOrRemoveInArray } from '../../../constants/helpers';

class FridgeIngredientScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKind: KIND_INGREDIENTS[0].value,
      currentFridge: props.currentFridge
    };

    this.selectKind = this.selectKind.bind(this);
    this.selectIngredient = this.selectIngredient.bind(this);
    this.resetFridge = this.resetFridge.bind(this);
  }

  selectKind(kind) {
    this.setState({
      selectedKind: kind
    });
  }

  selectIngredient(idIngredient) {
    const { currentFridge } = this.state;

    addOrRemoveInArray(currentFridge, idIngredient);

    this.setState({
      currentFridge
    });
  }

  resetFridge() {
    this.setState({
      currentFridge: []
    });
  }

  render() {
    const { selectedKind, currentFridge } = this.state;
    const { refIngredients, saveFridge } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ScrollView contentContainerStyle={styles.wrapperKindIngredients} horizontal>
            {KIND_INGREDIENTS.map(({ label, value }, i) => (
              <TouchableOpacity
                onPress={() => this.selectKind(value)}
                style={[
                  styles.kindIngredient,
                  selectedKind === value && styles.kindIngredientSelected
                ]}
                key={i}
              >
                <Icon icon={selectedKind === value ? `${value}--pink` : value} size={25} />
                <Text
                  medium
                  style={[
                    styles.textKindIngredient,
                    selectedKind === value && styles.textKindIngredientSelected
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ backgroundColor: 'lightgrey' }}>
            <Text style={styles.textInfo} medium>
              Appuyer sur les aliments disponibles dans votre frigo
            </Text>
            <View style={styles.wrapperIngredients}>
              {refIngredients
                .filter(ingredient => ingredient.kind === selectedKind)
                .map((ingredient, i) => (
                  <FridgeIngredient
                    {...ingredient}
                    key={i}
                    selectIngredient={id => this.selectIngredient(id)}
                    selected={currentFridge.includes(ingredient.id)}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.wrapperValidate}>
          <View style={styles.wrapperNbrValidate}>
            <Text style={styles.textValidate}>{currentFridge.length} aliments sélectionnés</Text>
            <TouchableOpacity onPress={() => this.resetFridge()}>
              <Text style={styles.textValidate} medium>
                Réinitialiser
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => saveFridge(currentFridge)} style={{ paddingTop: 10 }}>
            <Text style={[styles.textValidate, { textTransform: 'uppercase' }]} bold>
              Valider
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(refDataSelector, fridgeSelector);

export default connect(
  mapStateToProps,
  (dispatch, { navigation }) => ({
    saveFridge: fridge => dispatch(saveFridge(fridge, navigation))
  })
)(FridgeIngredientScreen);
