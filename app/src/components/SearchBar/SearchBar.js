import styles from './SearchBar.style';
import React from 'react';
import { Item, Input } from 'native-base';
import Icon from '../../components/Icon/Icon';

const SearchBar = ({ styleWrapper, styleInput, onChange, placeholderTextColor, placeholder }) => (
  <Item rounded style={[styles.wrapper, styleWrapper]}>
    <Icon icon="search" size={15} style={styles.iconSearch} />
    <Input
      onChangeText={onChange}
      style={styleInput}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
    />
  </Item>
);

export default SearchBar;
