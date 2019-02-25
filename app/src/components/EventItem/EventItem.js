import styles from './eventitem.style';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconStar from '../Icons/IconStar';
import { serverUrl } from '../../constants/global';
import ListAvatar from '../ListAvatar/ListAvatar';
import { compose } from 'recompose';
import { combineSelectors } from '../../constants/helpers';
import { currentUsernameSelector } from '../../redux/User/selectors';
import Text from '../Text/Text';

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToEventItem = this.redirectToEventItem.bind(this);
  }

  isInterested() {
    const { currentUsername, interested } = this.props;
    return !!interested.find(({ username }) => username === currentUsername);
  }

  redirectToEventItem() {
    const dataEventItem = this.props;

    this.props.navigation.navigate('EventItem', {
      idEvent: dataEventItem._id
    });
  }

  render() {
    const { name, creator, image, participants, style } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this.redirectToEventItem}>
        <View style={styles.wrapper}>
          <Image style={styles.imageEvent} source={{ uri: `${serverUrl}/${image.uri}` }} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.nameText} bold>{name}</Text>
            <Text>Par {creator.username}</Text>
            <ListAvatar listUser={participants} />
            <View />
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <IconStar isFill={this.isInterested()} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default compose(
  connect(combineSelectors(currentUsernameSelector)),
  withNavigation
)(EventItem);
