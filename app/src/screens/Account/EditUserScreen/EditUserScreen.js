import styles from './EditerUserScreen.style';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import { saveEditUser } from '../../../redux/User/actions';
import { serverUrl } from '../../../constants/global';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import InputImage from '../../../components/Input/InputImage';

class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { firstName, lastName, localization, bio, birthday } = this.props.infoUser;

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
    const { saveEditUser, infoUser } = this.props;
    const { username, email } = infoUser;
    const { firstName, lastName, localization, bio, image, birthday } = this.state;

    return (
      <ScrollView style={styles.container}>
        <InputImage
          icon="picture"
          placeholder="Modifier la photo"
          onPress={this._pickImage}
          picture={
            image ? `data:image/jpg;base64,${image.base64}` : `${serverUrl}/${infoUser.avatar.uri}`
          }
        />
        <Input value={email} editable={false} placeholder="Email" />
        <Input value={username} editable={false} placeholder="Username" />
        <Input
          value={lastName}
          onChange={lastName => this.setState({ lastName })}
          placeholder="Nom"
        />
        <Input
          value={firstName}
          onChange={firstName => this.setState({ firstName })}
          placeholder="Prénom"
        />
        <Input
          icon="location"
          value={localization}
          onChange={localization => this.setState({ localization })}
          placeholder="Localisation"
        />
        <Input value={bio} onChange={bio => this.setState({ bio })} placeholder="Bio" />

        <Button
          rounded
          text="Sauvegarder"
          onPress={() => saveEditUser(this.state)}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  infoUser: state.user.info
});

const mapDispatchToProps = (dispatch, { navigation }) => ({
  saveEditUser: info => dispatch(saveEditUser(info, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserScreen);
