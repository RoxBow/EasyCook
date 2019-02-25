import styles from './RecipeItemScreen.style';
import React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { serverUrl } from '../../../constants/global';
import { combineSelectors } from '../../../constants/helpers';
import { compose } from 'recompose';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import { refDataSelector, currentRecipeSelector } from '../../../redux/Recipe/selectors';
import HeadItem from '../../../components/HeadItem/HeadItem';
import TitleLine from '../../../components/TitleLine/TitleLine';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.formatIngredients();
  }

  formatIngredients() {
    const { currentRecipe, refIngredients } = this.props;
    const { ingredients } = currentRecipe;

    const formatedIngredient = ingredients.map(({ refId, quantity, unity }) => ({
      ...refIngredients.find(({ id }) => refId === id),
      quantity,
      unity
    }));

    this.setState({
      formatedIngredient
    });
  }

  render() {
    const { navigation, currentRecipe } = this.props;

    const {
      name,
      category,
      level,
      preparationTime,
      cookingTime,
      steps,
      equipments,
      description,
      image,
      creator
    } = currentRecipe;

    const { formatedIngredient } = this.state;

    return (
      <ScrollView>
        <Header style={{ height: 200 }} transparent>
          <ImageBackground
            source={{ uri: `${serverUrl}/${image.uri}` }}
            style={{ width: '100%', height: '100%' }}
          >
            <AntDesign
              size={26}
              name="arrowleft"
              style={{ padding: 8 }}
              onPress={() => navigation.goBack()}
            />
          </ImageBackground>
        </Header>
        <View style={styles.wrapperContent}>
          <HeadItem category={category} title={name} creator={creator} />

          <View style={styles.wrapperInfoIntro}>
            <View style={styles.elementInfoIntro}>
              <Icon icon="price" size={15} />
              <Text>{level}</Text>
            </View>
            <View style={styles.elementInfoIntro}>
              <Icon icon="price" size={15} />
              <Text>{preparationTime} min</Text>
            </View>
            <View style={styles.elementInfoIntro}>
              <Icon icon="price" size={15} />
              <Text>{cookingTime} min</Text>
            </View>
            <View style={styles.elementInfoIntro}>
              <Icon icon="price" size={15} />
              <Text>frigo/frigo</Text>
            </View>
          </View>

          <View style={styles.wrapperIngredients}>
            {formatedIngredient &&
              formatedIngredient.map(({ name, quantity, unity }, i) => (
                <View style={styles.wrapperIngredient} key={i}>
                  <Text>
                    {quantity} {unity} {name}
                  </Text>
                </View>
              ))}
          </View>

          <View style={styles.containerEquipments}>
            <TitleLine title="Matériel" styleWrapper={styles.titleLine} />
            <View style={styles.wrapperEquipments}>
              {equipments.map((name, i) => (
                <View style={styles.equipment} key={i}>
                  <Icon icon={name} size={25} />
                  <Text>{name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.containerSteps}>
            <TitleLine title="Préparation" styleWrapper={styles.titleLine} />
            {steps.map((content, i) => (
              <View style={styles.step} key={i}>
                <Text style={styles.numberStep} medium>{i + 1}</Text>
                <Text>{content}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = combineSelectors(refDataSelector, (s, { navigation }) =>
  currentRecipeSelector(navigation.state.params.idRecipe)(s)
);

export default compose(connect(mapStateToProps))(RecipeItem);
