import styles from './EditerUserScreen.style';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import { saveEditUser } from '../../../redux/User/actions';
import { infoSelector } from '../../../redux/User/selectors';
import { combineSelectors } from '../../../constants/helpers';
import { serverUrl } from '../../../constants/global';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import InputImage from '../../../components/Input/InputImage';

class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { firstName, lastName, localization, bio, birthday } = props.info;

    this.state = {
      firstName,
      lastName,
      localization,
      bio,
      birthday
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
      mediaTypes: 'Images',
      quality: 0.5
    });

    if (!image.cancelled) {
      this.setState({ image });
    }
  };

  render() {
    const { saveEditUser, info } = this.props;
    const { username, email, avatar } = info;
    const { firstName, lastName, localization, bio, image, birthday } = this.state;

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this._pickImage} style={styles.wrapperInputPicture}>
          <InputImage
            placeholder="Modifier la photo"
            onPress={this._pickImage}
            styleWrapperInput={{ paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0 }}
            stylePicture={{ width: 80, height: 80, borderRadius: 40 }}
            picture={
              image ? `data:image/jpg;base64,${image.base64}` : `${serverUrl}/${avatar.uri}`
            }
          />
          <Text style={styles.editPicture}>Modifier la photo</Text>
        </TouchableOpacity>
        <Input value={email} editable={false} label="Email" />
        <Input value={username} editable={false} label="Nom d'utilisateur" />
        <Input
          value={lastName}
          onChange={lastName => this.setState({ lastName })}
          placeholder="Nom"
          label="Nom"
        />
        <Input
          value={firstName}
          onChange={firstName => this.setState({ firstName })}
          placeholder="Prénom"
          label="Prénom"
        />
        <Input
          icon="location"
          value={localization}
          onChange={localization => this.setState({ localization })}
          placeholder="Localisation"
          label="Localisation"
        />
        <Input value={bio} onChange={bio => this.setState({ bio })} placeholder="Bio" label="Bio" />

        <Button
          rounded
          text="Modifier"
          onPress={() => saveEditUser(this.state)}
          style={{ marginVertical: 20 }}
        />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => ({
  saveEditUser: info => dispatch(saveEditUser(info, navigation))
});

export default connect(
  combineSelectors(infoSelector),
  mapDispatchToProps
)(EditUserScreen);
