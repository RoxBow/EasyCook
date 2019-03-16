import styles from './RecipeItemScreen.style';
import React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, Item, Input, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { serverUrl } from '../../../constants/global';
import { combineSelectors } from '../../../constants/helpers';
import { compose } from 'recompose';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import { refDataSelector, currentRecipeSelector } from '../../../redux/Recipe/selectors';
import { favRecipesSelector } from '../../../redux/User/selectors';
import HeadItem from '../../../components/HeadItem/HeadItem';
import TitleLine from '../../../components/TitleLine/TitleLine';
import Rating from '../../../components/Rating/Rating';
import { addComment } from '../../../redux/Recipe/actions';
import { toggleFavRecipe } from '../../../redux/User/actions';
import Comments from '../../../components/Comments/Comments';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import ModalAddRecipeCalendar from '../../../components/ModalAddRecipeCalendar/ModalAddRecipeCalendar';

class RecipeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      stars: 0,
      modalRecipeCalendarIsOpen: false
    };

    this.addComment = this.addComment.bind(this);
    this.isFav = this.isFav.bind(this);
  }

  componentDidMount() {
    this.formatIngredients();
  }

  isFav() {
    const { currentRecipe, currentFavRecipes } = this.props;
    return currentFavRecipes.includes(currentRecipe._id);
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

  addComment() {
    const { addComment, currentRecipe } = this.props;
    const { comment, stars } = this.state;

    addComment(currentRecipe._id, comment, stars);

    this.setState({
      comment: '',
      stars: 0
    });
  }

  render() {
    const { navigation, currentRecipe, toggleFavRecipe } = this.props;

    const {
      name,
      category,
      level,
      preparationTime,
      cookingTime,
      steps,
      equipments,
      image,
      creator,
      comments,
      _id
    } = currentRecipe;

    const { formatedIngredient, comment, stars, modalRecipeCalendarIsOpen } = this.state;

    return (
      <View>
        <ScrollView>
          <Header style={{ height: 200 }} transparent>
            <ImageBackground
              source={{ uri: `${serverUrl}/${image.uri}` }}
              style={{ width: '100%', height: '100%' }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AntDesign
                  size={26}
                  name="arrowleft"
                  style={{ padding: 8 }}
                  onPress={() => navigation.goBack()}
                />
                <Button
                  transparent
                  onPress={() => toggleFavRecipe(_id)}
                  style={{ paddingHorizontal: 8 }}
                >
                  <Icon icon={this.isFav() ? 'heart--fill' : 'heart'} size={24} />
                </Button>
              </View>
            </ImageBackground>
          </Header>
          <View style={styles.wrapperContent}>
            <HeadItem category={category} title={name} creator={creator} />

            <View style={styles.wrapperInfoIntro}>
              <View style={styles.elementInfoIntro}>
                <Icon icon="difficulty" size={20} />
                <Text style={styles.elementInfoIntroText}>{level}</Text>
              </View>
              <View style={styles.elementInfoIntro}>
                <Icon icon="preparation_time" size={20} />
                <Text style={styles.elementInfoIntroText}>{preparationTime} min</Text>
              </View>
              <View style={styles.elementInfoIntro}>
                <Icon icon="cooking_time" size={20} />
                <Text style={styles.elementInfoIntroText}>{cookingTime} min</Text>
              </View>
              <View style={styles.elementInfoIntro}>
                <Icon icon="fridge" size={20} />
                <Text style={styles.elementInfoIntroText}>frigo/frigo</Text>
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
                  <Text style={styles.numberStep} medium>
                    {i + 1}
                  </Text>
                  <Text>{content}</Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <TitleLine title="Commentaires" styleWrapper={styles.titleLine} />
            <Rating getRating={rating => this.setState({ stars: rating })} selected={stars} />
            <Item rounded>
              <Input
                onChangeText={comment => this.setState({ comment })}
                placeholder="J'adore ce gâteau"
                value={comment}
              />
            </Item>
            <Button transparent onPress={() => this.addComment()}>
              <Text>Envoyez</Text>
            </Button>
          </View>

          <Comments comments={comments} idRecipe={_id} />
        </ScrollView>
        <ButtonIcon
          icon="calendar_add"
          size={25}
          onPress={() => this.setState({ modalRecipeCalendarIsOpen: true })}
          style={styles.btnRecipeCalendar}
        />
        <ModalAddRecipeCalendar
          idRecipe={_id}
          isOpen={modalRecipeCalendarIsOpen}
          onRequestClose={() => this.setState({ modalRecipeCalendarIsOpen: false })}
        />
      </View>
    );
  }
}

const mapStateToProps = combineSelectors(
  refDataSelector, 
  favRecipesSelector, 
  (s, { navigation }) =>
  currentRecipeSelector(navigation.state.params.idRecipe)(s)
);

const mapDispatchToProps = dispatch => ({
  addComment: (idRecipe, text, rating) => dispatch(addComment(idRecipe, text, rating)),
  toggleFavRecipe: idRecipe => dispatch(toggleFavRecipe(idRecipe))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RecipeItem);
