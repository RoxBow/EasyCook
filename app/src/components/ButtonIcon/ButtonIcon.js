import React from 'react';
import { Button as ButtonNB } from 'native-base';
import Icon from '../Icon/Icon';

const ButtonIcon = ({ style, onPress, icon, size }) => (
  <ButtonNB transparent style={style} onPress={onPress}>
    <Icon icon={icon} size={size} />
  </ButtonNB>
);

export default ButtonIcon;
