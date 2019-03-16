import React from 'react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const ArrowBack = ({ navigation }) => (
    <ButtonIcon icon="arrow_back" size={30} onPress={() => navigation.goBack()} style={{ marginLeft: 15, alignSelf: 'center' }} />
);

export default ArrowBack;
