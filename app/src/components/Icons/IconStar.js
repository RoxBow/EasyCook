import React from 'react';
import Icon from '../Icon/Icon';

const IconStar = ({ width, height, isFill, style }) => (
  <Icon
    width={width || 22}
    height={height || 22}
    icon={isFill ? 'star--fill' : 'star'}
    style={style}
  />
);

export default IconStar;
