import styles from './Accordeon.style';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Arrow from '../Icons/IconArrow';
import { ARROW } from '../../constants/global';
import { lightgrey } from '../../constants/colors';
import Text from '../Text/Text';

class Accordeon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { children, title } = this.props;
    const { isOpen } = this.state;

    return (
      <View style={styles.wrapperIngredients}>
        <TouchableOpacity style={styles.wrapperTitle} onPress={this.toggle}>
          <Text style={styles.title} bold>{title}</Text>
          <Arrow
            size={22}
            name={isOpen ? ARROW.TOP : ARROW.BOTTOM}
            style={{ alignSelf: 'center' }}
            color={lightgrey}
          />
        </TouchableOpacity>
        {isOpen && children}
      </View>
    );
  }
}

export default Accordeon;
