import React from 'react';
import { DatePicker } from 'native-base';
import { connect } from 'react-redux';
import { createGoodDeal } from '../../../redux/GoodDeal/actions';
import { ImagePicker, Permissions } from 'expo';
import { View } from 'react-native';
import Text from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import InputImage from '../../../components/Input/InputImage';
import Button from '../../../components/Button/Button';

class CreateGoodDealScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      storeName: '',
      promo: '',
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
      base64: false,
      mediaTypes: 'Images'
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  };

  render() {
    const { createGoodDeal } = this.props;
    const { storeName, date, promo, address, image, description } = this.state;

    return (
      <View>
        <Input
          big
          onChange={storeName => this.setState({ storeName })}
          value={storeName}
          placeholder="Nom du magasin"
        />

        <InputImage
          icon="picture"
          placeholder="Ajouter une image"
          picture={`data:image/jpg;base64,${image.base64}`}
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
          icon="location"
          onChange={promo => this.setState({ promo })}
          value={promo}
          placeholder="Réduction"
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
          onPress={() => createGoodDeal(storeName, date, address, description, image)}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  createGoodDeal: (storeName, date, address, description, image) =>
    dispatch(createGoodDeal(storeName, date, address, description, image, navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateGoodDealScreen);
