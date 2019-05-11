import styles from './SettingShoppingListItemScreen.style';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { currentShoppingListSelector } from '../../../redux/ShoppingList/selectors';
import { combineSelectors } from '../../../constants/helpers';
import ListAvatar from '../../../components/ListAvatar/ListAvatar';
import { leaveShoppingList } from '../../../redux/ShoppingList/actions';
import Text from '../../../components/Text/Text';
import GroupButton from '../../../components/GroupButton/GroupButton';
import ButtonSetting from '../../../components/ButtonSetting/ButtonSetting';
import { compose, mapProps } from 'recompose';

const SettingShoppingListItemScreen = ({ leaveShoppingList, users, name, _id }) => (
  <View style={styles.wrapper}>
    <View style={styles.wrapperHead}>
      <ListAvatar listUser={users} styleThumbnail={{ width: 80, height: 80, borderRadius: 40 }} />
      <Text style={styles.name} bold>
        {name}
      </Text>
    </View>
    <GroupButton title="Préférences">
      <ButtonSetting label="Voir les membres de la liste" route="" />
      <ButtonSetting label="Partager le lien de la liste" route="" />
      <ButtonSetting label="Recevoir les notifications" route="" />
    </GroupButton>
    <ButtonSetting label="Quitter la liste" onPress={() => leaveShoppingList(_id)}/>
  </View>
);

const mapStateToProps = combineSelectors((s, { navigation }) =>
  currentShoppingListSelector(navigation.state.params.idShoppingList)(s)
);

const mapDispatchToProps = (dispatch, { navigation }) => ({
  leaveShoppingList: idShoppingList => dispatch(leaveShoppingList(idShoppingList, navigation))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapProps(({ currentShoppingList, ...rest }) => ({
    ...currentShoppingList,
    ...rest
  }))
)(SettingShoppingListItemScreen);
