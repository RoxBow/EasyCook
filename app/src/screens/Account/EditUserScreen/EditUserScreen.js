import styles from './EditerUserScreen.style';
import React from 'react';
import { ScrollView } from 'react-native';
import { Textarea, Label, Item, Input, Form, Button, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import { saveEditUser } from '../../../redux/User/actions';
import { serverUrl } from '../../../constants/global';
import Text from '../../../components/Text/Text';

class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { firstName, lastName, localization, bio } = this.props.infoUser;

    this.state = {
      firstName,
      lastName,
      localization,
      bio
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
    const { username, email, saveEditUser, infoUser } = this.props;
    const { firstName, lastName, localization, bio, image } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Form>
          <Item style={{ borderBottomWidth: 0 }} onPress={this._pickImage}>
            <Thumbnail
              large
              source={{
                uri:
                  (image && `data:image/jpg;base64,${image.base64}`) ||
                  `${serverUrl}/${infoUser.avatar.uri}`
              }}
            />
            <Label>Modifier la photo</Label>
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={email} disabled />
          </Item>
          <Item floatingLabel>
            <Label>Nom utilisateur </Label>
            <Input value={username} disabled />
          </Item>
          <Item floatingLabel>
            <Label>Nom</Label>
            <Input onChangeText={lastName => this.setState({ lastName })} value={lastName} />
          </Item>
          <Item floatingLabel>
            <Label>Prénom</Label>
            <Input onChangeText={firstName => this.setState({ firstName })} value={firstName} />
          </Item>
          <Item floatingLabel>
            <Label>Localisation</Label>
            <Input
              onChangeText={localization => this.setState({ localization })}
              value={localization}
            />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input value="DATE PICKER" />
          </Item>
          <Item stackedLabel last style={{ borderBottomWidth: 0 }}>
            <Label>Présentation</Label>
            <Textarea
              rowSpan={3}
              bordered
              placeholder="Bio"
              value={bio}
              style={{ alignSelf: 'flex-start', width: '70%' }}
            />
          </Item>
        </Form>
        <Button onPress={() => saveEditUser(this.state)}>
          <Text>Sauvegarder</Text>
        </Button>
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
