import React from 'react';
import Text from '../../Text/Text';

const TitleHeader = ({ title, style }) => (
  <Text style={[{ fontSize: 18, flex: 1, textAlign: 'center' }, style]} bold>
    {title}
  </Text>
);

export default TitleHeader;
