import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Arrow from '../Icons/IconArrow';
import s from './ButtonSetting.style';
import { withNavigation } from 'react-navigation';
import { ARROW } from '../../constants/global';
import { grey } from '../../constants/colors';

const ButtonSetting = ({ label, icon, style, route, navigation, onPress }) => (
  <TouchableOpacity style={[s.wrapper, style]} onPress={()  => onPress ? onPress() : navigation.navigate(route)}>
    <View style={s.wrapperLabel}>
      {icon && <Icon icon={icon} size={22}/>}
      <Text style={s.label}>{label}</Text>
    </View>
    <Arrow size={26} name={ARROW.RIGHT} color={grey} />
  </TouchableOpacity>
);

export default withNavigation(ButtonSetting);