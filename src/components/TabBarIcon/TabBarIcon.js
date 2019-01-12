import React from 'react';
import { Icon } from 'expo';
class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.FontAwesome
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? '#ccc' : '#c00'}
      />
    );
  }
}

export default TabBarIcon;