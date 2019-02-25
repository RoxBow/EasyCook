import styles from './CreateRecipeScreen.style';
import React from 'react';
import { Picker, View, ScrollView, TextInput } from 'react-native';
import { Button, Item, Input, Label, Root } from 'native-base';
import { connect } from 'react-redux';
import { createRecipe } from '../../../redux/Recipe/actions';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import Text from '../../../components/Text/Text';
import { LEVELS, CATEGORIES, UNITS } from '../../../constants/global';
import ModalEquipment from '../../../components/ModalEquipment/ModalEquipment';
import ModalSearchIngredient from '../../../components/ModalSearchIngredient/ModalSearchIngredient';
import OwnButton from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';

class CreateRecipeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Pancake framboise',
      level: LEVELS[0].value,
      category: CATEGORIES[0].value,
      preparationTime: '20',
      cookingTime: '10',
      steps: [''],
      ingredients: [],
      equipments: [],
      modalIngredientIsVisible: false,
      modalEquipmentIsVisible: false
    };

    this.createRecipe = this.createRecipe.bind(this);
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addEquipments = this.addEquipments.bind(this);
    this.removeEquipment = this.removeEquipment.bind(this);
  }

  setModalVisible(type, visible) {
    if (type === 'equipment') {
      this.setState({ modalEquipmentIsVisible: visible });
    } else if (type === 'ingredient') {
      this.setState({ modalIngredientIsVisible: visible });
    }
  }

  addStep() {
    const { steps } = this.state;
    steps.push('');
    this.setState({
      steps
    });
  }

  removeStep(i) {
    const { steps } = this.state;
    steps.splice(i, 1);
    this.setState({
      steps
    });
  }

  addIngredient(ingredient) {
    const { ingredients } = this.state;
    const { id, name } = ingredient;

    const ingredientAdded = { refId: id, name, quantity: '1', unity: UNITS[0].value };
    ingredients.push(ingredientAdded);
    this.setState({
      ingredients
    });
    this.setModalVisible('ingredient', false);
  }

  removeIngredient(i) {
    const { ingredients } = this.state;
    ingredients.splice(i, 1);
    this.setState({
      ingredients
    });
  }

  addEquipments(equipmentsUpdated) {
    this.setState({
      equipments: equipmentsUpdated
    });
    this.setModalVisible('equipment', false);
  }

  removeEquipment(i) {
    const { equipments } = this.state;
    equipments.splice(i, 1);
    this.setState({
      equipments
    });
  }

  createRecipe() {
    const {
      name,
      category,
      level,
      preparationTime,
      cookingTime,
      steps,
      ingredients,
      equipments,
      image
    } = this.state;

    // format for model ingredient
    const ingredientsFormated = ingredients.map(({refId, quantity, unity}) => ({refId, quantity, unity}));

    this.props.createRecipe(
      name,
      category,
      level,
      preparationTime,
      cookingTime,
      steps,
      ingredientsFormated,
      equipments,
      image
    );
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  _pickImage = async () => {
    await this.askPermissionsAsync();

    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      base64: false,
      mediaTypes: 'Images'
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  };

  updateStateSelect(type, value) {
    if (type === 'categories') {
      this.setState({
        category: value
      });
    } else if (type === 'levels') {
      this.setState({
        level: value
      });
    } else if (typee === 'units') {
    }
  }

  render() {
    const {
      name,
      preparationTime,
      cookingTime,
      steps,
      ingredients,
      equipments,
      modalEquipmentIsVisible,
      modalIngredientIsVisible
    } = this.state;

    return (
      <Root>
        <ScrollView style={styles.container}>
          <Item style={styles.wrapperInput}>
            <Input
              style={styles.mainInput}
              onChangeText={name => this.setState({ name })}
              value={name}
              placeholder="Nom de la recette"
            />
            <Ionicons name="md-images" size={35} color="#000" onPress={this._pickImage} />
          </Item>

          <Item style={styles.wrapperInput} floatingLabel>
            <Ionicons name="md-time" size={20} color="#000" />
            <Label>Temps de préparation</Label>
            <Input
              style={styles.input}
              onChangeText={preparationTime => this.setState({ preparationTime })}
              value={preparationTime}
              placeholder="Temps de préparation"
            />
          </Item>

          <Item style={styles.wrapperInput} floatingLabel>
            <Ionicons name="md-time" size={20} color="#000" />
            <Label>Temps de cuisson</Label>
            <Input
              style={styles.input}
              onChangeText={cookingTime => this.setState({ cookingTime })}
              value={cookingTime}
              placeholder="Temps de cuisson"
            />
          </Item>
          <View>
            <Label>Difficulté</Label>
            <Select values={LEVELS} updateValue={value => this.setState({ level: value })} />
          </View>

          <View>
            <Label>Catégorie</Label>
            <Select values={CATEGORIES} updateValue={value => this.setState({ category: value })} />
          </View>

          <View>
            <Text>Équipements</Text>
            {equipments &&
              equipments.map((name, i) => (
                <View key={i} style={{ flexDirection: 'row' }}>
                  <Text>{name}</Text>
                  <Button onPress={() => this.removeEquipment(i)}>
                    <Text>Supprimer équipment</Text>
                  </Button>
                </View>
              ))}
            <Button
              onPress={() => this.setModalVisible('equipment', true)}
              style={{ marginTop: 20 }}
            >
              <Text>Ajouter équipement</Text>
            </Button>
          </View>

          <View>
            <Text>Ingrédients</Text>
            {ingredients &&
              ingredients.map(({ name, quantity, unity }, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 15 }}>
                  <Text>{name}</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={quantity => {
                      ingredients[i].quantity = quantity;
                      this.setState({ ingredients });
                    }}
                    value={quantity}
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#fff',
                      color: '#000',
                      paddingVertical: 20,
                      width: '20%',
                      textAlign: 'center',
                      fontSize: 22,
                      marginRight: 10
                    }}
                  />
                  <Select
                    values={UNITS}
                    selected={unity}
                    updateValue={value => {
                      ingredients[i].unity = value;
                      this.setState({ ingredients });
                    }}
                  />
                  <Button onPress={() => this.removeIngredient(i)}>
                    <Text>Supprimer ingrédient</Text>
                  </Button>
                </View>
              ))}
            <Button onPress={() => this.setModalVisible('ingredient', true)}>
              <Text>Ajouter ingrédient</Text>
            </Button>
          </View>

          <View>
            <Text>Étape(s)</Text>
            {steps.map((explanation, i) => (
              <Item style={styles.wrapperInput} key={i}>
                <Text>{i + 1}</Text>
                <Input
                  style={styles.input}
                  onChangeText={text => {
                    steps[i] = text;
                    this.setState({ steps });
                  }}
                  value={explanation}
                  placeholder="Explication de l'étape"
                />
                <Button onPress={() => this.removeStep(i)}>
                  <Text>Retirer une étape</Text>
                </Button>
              </Item>
            ))}
            <Button onPress={this.addStep}>
              <Text>Ajouter une étape</Text>
            </Button>
          </View>

          <OwnButton text="Créer" rounded onPress={() => this.createRecipe()} />

          <ModalEquipment
            isOpen={modalEquipmentIsVisible}
            equipments={equipments}
            addEquipments={this.addEquipments}
          />
          <ModalSearchIngredient
            isOpen={modalIngredientIsVisible}
            addIngredient={this.addIngredient}
          />
        </ScrollView>
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  createRecipe: (
    name,
    category,
    level,
    preparationTime,
    cookingTime,
    steps,
    ingredients,
    equipments,
    image
  ) =>
    dispatch(
      createRecipe(
        name,
        category,
        level,
        preparationTime,
        cookingTime,
        steps,
        ingredients,
        equipments,
        image,
        navigation
      )
    )
});

export default connect(
  null,
  mapDispatchToProps
)(CreateRecipeScreen);
