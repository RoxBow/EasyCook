import React from 'react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const ArrowBack = ({ navigation, style, isWhite }) => (
  <ButtonIcon
    icon={!isWhite ? "arrow_back" : "arrow_back--white"}
    size={30}
    onPress={() => navigation.goBack()}
    style={[{ marginLeft: 15, alignSelf: 'center' }, style]}
  />
);

export default ArrowBack;
