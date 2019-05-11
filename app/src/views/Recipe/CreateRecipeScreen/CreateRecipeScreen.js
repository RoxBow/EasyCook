import styles from './CreateRecipeScreen.style';
import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Root } from 'native-base';
import { connect } from 'react-redux';
import { createRecipe } from '../../../redux/Recipe/actions';
import { ImagePicker, Permissions } from 'expo';
import Text from '../../../components/Text/Text';
import { LEVELS, CATEGORIES, UNITS } from '../../../constants/global';
import { isArrayFill } from '../../../constants/helpers';
import ModalEquipment from '../../../components/ModalEquipment/ModalEquipment';
import ModalSearchIngredient from '../../../components/ModalSearchIngredient/ModalSearchIngredient';
import Button from '../../../components/Button/Button';
import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import InputImage from '../../../components/Input/InputImage';
import Tag from '../../../components/Tag/Tag';
import Icon from '../../../components/Icon/Icon';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';

class CreateRecipeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      level: LEVELS[0].value,
      category: CATEGORIES[0].value,
      preparationTime: '',
      cookingTime: '',
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
    const ingredientsFormated = ingredients.map(({ refId, quantity, unity }) => ({
      refId,
      quantity,
      unity
    }));

    const stepsFormated = steps.filter(step => step !== "");

    this.props.createRecipe(
      name,
      category,
      level,
      preparationTime,
      cookingTime,
      stepsFormated,
      ingredientsFormated,
      equipments,
      image
    );
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
      image,
      modalEquipmentIsVisible,
      modalIngredientIsVisible
    } = this.state;

    return (
      <Root>
        <ScrollView style={styles.container}>
          <Input
            big
            onChange={name => this.setState({ name })}
            value={name}
            placeholder="Nom de la recette"
          />

          <InputImage
            icon="picture"
            placeholder="Ajouter une image"
            picture={image && `data:image/jpg;base64,${image.base64}`}
            onPress={this._pickImage}
          />

          <View style={styles.wrapperSelect}>
            <Icon icon="category" size={20} style={styles.iconSelect} />
            <Text>Catégorie</Text>
            <Select
              values={CATEGORIES}
              updateValue={value => this.setState({ category: value })}
              style={styles.select}
              styleText={styles.textSelect}
              icon="chevron_select"
              size={14}
            />
          </View>

          <Input
            label="Temps de préparation (min)"
            icon="preparation_time"
            onChange={preparationTime => this.setState({ preparationTime })}
            value={preparationTime}
            placeholder="Temps de préparation (min)"
          />

          <Input
            label="Temps de cuisson (min)"
            icon="cooking_time"
            onChange={cookingTime => this.setState({ cookingTime })}
            value={cookingTime}
            placeholder="Temps de cuisson (min)"
          />

          <View style={styles.wrapperSelect}>
            <Icon icon="difficulty" size={20} style={styles.iconSelect} />
            <Text>Difficulté</Text>
            <Select
              values={LEVELS}
              updateValue={value => this.setState({ level: value })}
              style={styles.select}
              styleText={styles.textSelect}
              icon="chevron_select"
              size={14}
            />
          </View>

          <View style={styles.wrapperSelectTag}>
            <Icon icon="equipment" size={22} style={styles.iconTitleSelectTag} />
            <TouchableOpacity
              onPress={() => this.setModalVisible('equipment', true)}
              style={styles.wrapperTitleSelectTag}
            >
              <Text>Équipements</Text>
              <Icon icon="plus" size={18} style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>

            {isArrayFill(equipments) && (
              <View style={styles.wrapperListTag}>
                {equipments.map((name, i) => (
                  <Tag
                    tag={name}
                    removeTag={() => this.removeEquipment(i)}
                    style={{ marginRight: 10 }}
                    key={i}
                  />
                ))}
              </View>
            )}
          </View>

          <View style={styles.wrapperSelectTag}>
            <Icon icon="ingredient" size={22} style={styles.iconTitleSelectTag} />
            <TouchableOpacity
              onPress={() => this.setModalVisible('ingredient', true)}
              style={styles.wrapperTitleSelectTag}
            >
              <Text>Ingrédients</Text>
              <Icon icon="plus" size={18} style={{ alignSelf: 'flex-end' }} />
            </TouchableOpacity>

            {isArrayFill(ingredients) && (
              <View style={styles.wrapperIngredient}>
                {ingredients.map(({ name, quantity, unity }, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
                    <Text style={{ marginRight: 10 }}>{name}</Text>
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
                        paddingVertical: 10,
                        width: '20%',
                        textAlign: 'center',
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
                    <ButtonIcon
                      icon="cross"
                      size={18}
                      onPress={() => this.removeIngredient(i)}
                      style={{ marginLeft: 15 }}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View>
            <View
              style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: '#F5F8F7' }}
            >
              <Text medium>Préparation</Text>
            </View>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              {steps.map((explanation, i) => (
                <View key={i} style={styles.step}>
                  <View style={styles.wrapperStepText}>
                    <Text style={styles.numberStep}>{i + 1}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => {
                        steps[i] = text;
                        this.setState({ steps });
                      }}
                      value={explanation}
                      placeholder="Explication de l'étape"
                    />
                  </View>
                  <ButtonIcon
                    icon="cross"
                    size={18}
                    onPress={() => this.removeStep(i)}
                    style={{ alignSelf: 'flex-end' }}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={this.addStep} style={styles.btnAddStep}>
              <Icon icon="plus" size={18} style={{ marginRight: 6 }} />
              <Text>Ajouter une étape</Text>
            </TouchableOpacity>
          </View>

          <Button
            text="Créer"
            rounded
            onPress={() => this.createRecipe()}
            style={{ width: '50%', justifyContent: 'center', marginVertical: 15 }}
          />

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
