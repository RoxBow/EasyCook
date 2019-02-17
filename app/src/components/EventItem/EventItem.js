import styles from './eventitem.style';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconStar from '../Icons/IconStar';
import { serverUrl } from '../../constants/global';
import ListAvatar from '../ListAvatar/ListAvatar';

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
    const { name, creator, image, participants } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.redirectToEventItem}>
        <View style={styles.wrapper}>
          <Image style={styles.imageEvent} source={{ uri: `${serverUrl}/${image.uri}` }} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.nameText}>{name}</Text>
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

const mapStateToProps = state => ({
  currentUsername: state.user.info.username
});

export default withNavigation(connect(mapStateToProps)(EventItem));
