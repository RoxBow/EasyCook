import styles from './Select.style';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import Arrow from '../Icons/IconArrow';
import Icon from '../Icon/Icon';
import { ARROW } from '../../constants/global';
import { ActionSheet } from 'native-base';

class Select extends React.Component {
  constructor(props) {
    super(props);

    const { isOpen, values, selected } = props;
    this.state = {
      isOpen: isOpen || false,
      selectedValue: selected
        ? values.find(({ value }) => value === selected).value
        : values[0].value,
      label: selected ? values.find(({ value }) => value === selected).label : values[0].label
    };

    this.showActions = this.showActions.bind(this);
  }

  showActions() {
    const formatValues = this.props.values.map(({ label }) => label);
    const values = [...formatValues, 'Annuler'];
    const CANCEL_INDEX = values.length - 1;

    return ActionSheet.show(
      {
        options: values,
        cancelButtonIndex: CANCEL_INDEX
      },
      value => {
        if (value !== CANCEL_INDEX) this.onSelectedValue(value);
      }
    );
  }

  onSelectedValue(indexValue) {
    const { values } = this.props;
    const label = values[indexValue].label;
    const selectedValue = values[indexValue].value;

    // update value of parent's state
    this.props.updateValue(selectedValue, indexValue);

    this.setState({
      selectedValue,
      label
    });
  }

  render() {
    const { label } = this.state;
    const { style, bold, styleText, icon, size } = this.props;

    return (
      <TouchableOpacity onPress={() => this.showActions()} style={[styles.wrapper, style]}>
        <Text style={styleText} bold={bold}>
          {label}
        </Text>
        <View style={{ marginLeft: 10 }}>
          {icon ? <Icon icon={icon} size={size} /> : <Arrow size={22} name={ARROW.BOTTOM} />}
        </View>
      </TouchableOpacity>
    );
  }
}

export default Select;
