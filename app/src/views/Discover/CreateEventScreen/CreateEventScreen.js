import styles from './CreateEventScreen.style';
import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { createEvent } from '../../../redux/Event/actions';
import { ImagePicker, Permissions } from 'expo';
import Text from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import InputImage from '../../../components/Input/InputImage';
import Button from '../../../components/Button/Button';
import DatePicker from 'react-native-datepicker';
import 'moment/locale/fr';
import { pink } from '../../../constants/colors';
import Icon from '../../../components/Icon/Icon';

class CreateEventScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      description: '',
      formatDate: new Date(),
      date: new Date()
    };
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
      base64: true,
      mediaTypes: 'Images'
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  };

  render() {
    const { createEvent } = this.props;
    const { name, formatDate, date, description, address, price, image } = this.state;

    return (
      <View>
        <Input
          big
          onChange={name => this.setState({ name })}
          value={name}
          placeholder="Nom de l'événement"
        />

        <InputImage
          icon="picture"
          placeholder="Ajouter une image"
          picture={image && `data:image/jpg;base64,${image.base64}`}
          onPress={this._pickImage}
        />

        <TouchableOpacity
          onPress={() => this.datePicker.onPressDate()}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'lightgrey',
            borderBottomWidth: 1
          }}
        >
          <Icon icon="date" size={20} style={{ marginRight: 15 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1
            }}
          >
            <DatePicker
              locale="fr"
              showIcon={false}
              date={formatDate}
              mode="datetime"
              format="ddd D MMMM YYYY"
              minDate={new Date()}
              confirmBtnText="Valider"
              cancelBtnText="Annuler"
              ref={picker => {
                this.datePicker = picker;
              }}
              customStyles={{
                dateTouch: {
                  flex: 1
                },
                dateInput: {
                  borderWidth: 0
                },
                btnTextConfirm: {
                  color: pink
                },
                dateText: {
                  fontSize: 18
                }
              }}
              onDateChange={(formatDate, date) => {
                this.setState({ formatDate, date });
              }}
            />
            <Text style={{ fontSize: 18 }}>{`${new Date(date).getHours()}:${new Date(
              date
            ).getMinutes()}`}</Text>
          </View>
        </TouchableOpacity>

        <Input
          icon="location"
          onChange={address => this.setState({ address })}
          value={address}
          placeholder="Ajouter un lieu"
        />

        <Input
          icon="price"
          onChange={price => this.setState({ price })}
          value={price}
          placeholder="Gratuit par défaut"
        />

        <View>
          <Input
            icon="detail"
            maxLength={4}
            onChange={description => this.setState({ description })}
            value={description}
            styleWrapperInput={{ height: 150, alignItems: 'flex-start' }}
            placeholder="Décrire l'événement"
          />
          <Text style={styles.remainingText}>{`${description.length}/2000`}</Text>
        </View>

        <Button
          rounded
          text="Créer"
          onPress={() => createEvent(name, date, address, description, price, image)}
          style={styles.btnCreate}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  createEvent: (name, date, address, description, image) =>
    dispatch(createEvent(name, date, address, description, price, image, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEventScreen);
