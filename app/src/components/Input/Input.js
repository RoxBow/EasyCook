import styles from './Input.style';
import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from '../Icon/Icon';

const Input = ({
  icon,
  sizeIcon,
  styleInput,
  styleWrapperInput,
  onChange,
  value,
  placeholder,
  big,
  editable = true,
}) => (
  <View style={[styles.wrapper, styleWrapperInput, big && styles.wrapperBigInput, !editable && styles.wrapperDisabledInput]}>
    {icon && <Icon icon={icon} size={sizeIcon || 20} style={styles.icon} />}

    <TextInput
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
