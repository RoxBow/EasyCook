import React from 'react';
import Icon from '../Icon/Icon';

const IconStar = ({ width, height, size, isFill, style }) => (
  <Icon
    size={size || 22 }
    icon={isFill ? 'star--fill' : 'star'}
    style={style}
  />
);

export default IconStar;
