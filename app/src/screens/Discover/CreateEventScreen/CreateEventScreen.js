import React from 'react';
import { DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { createEvent } from '../../../redux/Event/actions';
import { ImagePicker, Permissions } from 'expo';
import Text from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import InputImage from '../../../components/Input/InputImage';
import Button from '../../../components/Button/Button';

class CreateEventScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      address: '',
      description: '',
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
      base64: true,
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

        <Input
          icon="location"
          onChange={address => this.setState({ address })}
          value={address}
          placeholder="Lieu"
        />

        <Input
          icon="detail"
          onChange={description => this.setState({ description })}
          value={description}
          placeholder="Description"
        />

        <Button
          rounded
          text="Créer"
          onPress={() => createEvent(name, date, address, description, image)}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  createEvent: (name, date, address, description, image) =>
    dispatch(createEvent(name, date, address, description, image, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateEventScreen);
