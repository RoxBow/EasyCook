import styles from './createeventscreen.style';
import React from 'react';
import { Text } from 'react-native';
import { Container, DatePicker, Button, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import { createEvent } from '../../../redux/Event/actions';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';

class CreateEventScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: 'La pêche aux moules',
      address: '12 avenue des bonbons',
      description: "C'est bon les bonbons",
      date: new Date()
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ date: newDate });
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

  render() {
    const { createEvent } = this.props;
    const { name, date, description, address, image } = this.state;

    return (
      <Container style={styles.container}>
        <Item style={styles.wrapperInput}>
          <Input
            style={styles.mainInput}
            onChangeText={name => this.setState({ name })}
            value={name}
            placeholder="Nom de l'événement"
          />
          <Ionicons name="md-images" size={35} color="#000" onPress={this._pickImage} />
        </Item>

        <DatePicker
          minimumDate={new Date()}
          locale={'fr'}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText="Définir une date"
          textStyle={{ color: '#000' }}
          placeHolderTextStyle={{ color: '#d3d3d3' }}
          onDateChange={this.setDate}
          disabled={false}
        />
        <Text>Date: {date.toString().substr(4, 12)}</Text>

        <Item style={styles.wrapperInput}>
          <Entypo name="location" size={20} color="#000" />
          <Input
            style={styles.input}
            onChangeText={address => this.setState({ address })}
            value={address}
            placeholder="Ajouter un lieu"
          />
        </Item>

        <Item style={styles.wrapperInput}>
          <MaterialIcons name="description" size={20} color="#000" />
          <Input
            style={styles.input}
            onChangeText={description => this.setState({ description })}
            value={description}
            placeholder="Décrire l'événement"
          />
        </Item>

        <Button
          style={styles.btnValidate}
          rounded
          onPress={() => createEvent(name, date, address, description, image)}
        >
          <Text style={styles.btnValidateText}>Créer</Text>
        </Button>

      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  createEvent: (name, date, address, description, image) =>
    dispatch(createEvent(name, date, address, description, image, navigation)),
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEventScreen);
