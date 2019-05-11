import s from './SettingsScreen.style';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { requestLogout, requestDeleteAccount } from '../../../redux/User/actions';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';
import ButtonSetting from '../../../components/ButtonSetting/ButtonSetting';
import GroupButton from '../../../components/GroupButton/GroupButton';

const SettingsScreen = ({ requestLogout, requestDeleteAccount }) => (
  <View style={s.wrapper}>
    <GroupButton title="Notifications">
      <ButtonSetting label="Gérer les notifications" icon="bell" route="" />
    </GroupButton>

    <GroupButton title="Divers">
      <ButtonSetting label="Aide" icon="help" route="" />
      <ButtonSetting label="À propos" icon="about" route="" />
      <ButtonSetting label="Mentions légales" icon="legal_mention" route="" />
    </GroupButton>

    <Button onPress={requestLogout} style={s.btnLogout} styleText={s.btnLogoutText} text="Me déconnecter">
      <Icon icon="logout" size={22} style={s.icon}/>
    </Button>

    <Button
      onPress={requestDeleteAccount}
      style={s.btnDeleteAccount}
      styleText={{ color: 'red' }}
      text="Supprimer mon compte"
      transparent
    >
      <Icon icon="delete_account" size={35} />
    </Button>
  </View>
);

const mapDispatchToProps = (dispatch, { navigation }) => ({
  requestLogout: () => dispatch(requestLogout(navigation)),
  requestDeleteAccount: () => dispatch(requestDeleteAccount(navigation))
});

export default connect(
  null,
  mapDispatchToProps
)(SettingsScreen);
