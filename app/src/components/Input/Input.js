import styles from './Input.style';
import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const Input = ({
  icon,
  sizeIcon,
  styleInput,
  styleWrapperInput,
  onChange,
  value,
  placeholder,
  big,
  label,
  maxLength,
  editable = true
}) => (
  <View
    style={[
      styles.wrapper,
      styleWrapperInput,
      (label && value) && styles.wrapperInputLabel,
      big && styles.wrapperBigInput,
      !editable && styles.wrapperDisabledInput
    ]}
  >
      {icon && <Icon icon={icon} size={sizeIcon || 22} style={styles.icon} />}

      {(label && !!value) && <Text>{label}</Text>}
    <TextInput
      maxLength={maxLength}
      editable={editable}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="grey"
      style={[styles.input, styleInput, big && styles.bigInput]}
    />
  </View>
);

export default Input;
