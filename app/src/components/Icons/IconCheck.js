import React from 'react';
import Icon from '../Icon/Icon';

const IconCheck = ({ isChecked, size, style }) => (
  <Icon
    size={size || 22}
    icon={isChecked ? 'check--fill' : 'check'}
    style={style}
  />
);

export default IconCheck;
