import styles from './eventitem.style';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { togglePin } from '../../redux/ShoppingList/actions';
import { FontAwesome } from '@expo/vector-icons';

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToEventItem = this.redirectToEventItem.bind(this);
  }

  redirectToEventItem() {
    const dataEventItem = this.props;

    this.props.navigation.navigate('EventItem', {
      idEvent: dataEventItem._id
    });
  }

  render() {
    const { name, creator, isFav } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.redirectToEventItem}>
        <View style={styles.wrapper}>
          <Image style={styles.imageEvent} source={{ uri: 'https://bit.ly/2B86Dd1' }} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.nameText}>{name}</Text>
            <Text>Par {creator.username}</Text>
            <View />
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <FontAwesome name={isFav ? 'star' : 'star-o'} size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  togglePin: id => dispatch(togglePin(id))
});

export default withNavigation(
  connect(
    null,
    mapDispatchToProps
  )(EventItem)
);
