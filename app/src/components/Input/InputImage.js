import styles from './Input.style';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const Input = ({ icon, sizeIcon, onPress, styleWrapperInput, placeholder, picture }) => (
  <TouchableOpacity style={[styles.wrapper, styleWrapperInput]} onPress={onPress}>
    {icon && <Icon icon={icon} size={sizeIcon || 20} style={styles.icon} />}
    {!picture ? (
      <Text style={styles.placeholderImage}>{placeholder}</Text>
    ) : (
      <Image
        source={{
          uri: picture
        }}
        style={{ width: 50, height: 50 }}
      />
    )}
  </TouchableOpacity>
);

export default Input;
