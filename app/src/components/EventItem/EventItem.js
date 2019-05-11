import styles from './eventitem.style';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconStar from '../Icons/IconStar';
import IconCheck from '../Icons/IconCheck';
import { serverUrl } from '../../constants/global';
import ListAvatar from '../ListAvatar/ListAvatar';
import { compose } from 'recompose';
import { combineSelectors } from '../../constants/helpers';
import {
  currentUsernameSelector,
  isInterestedSelector,
  isParticipantSelector
} from '../../redux/User/selectors';
import Text from '../Text/Text';

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
    const { name, creator, image, participants, style, isInterested, isParticipant } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this.redirectToEventItem}>
        <View style={styles.wrapper}>
          <Image style={styles.imageEvent} source={{ uri: `${serverUrl}/${image.uri}` }} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.nameText} bold>
              {name}
            </Text>
            <Text>Par {creator.username}</Text>
            <ListAvatar listUser={participants} />
            <View />
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <IconCheck isChecked={isParticipant} style={styles.leftIcon} />
          <IconStar isFill={isInterested} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default compose(
  connect(
    combineSelectors(
      currentUsernameSelector,
      (s, { interested }) => isInterestedSelector(interested)(s),
      (s, { participants }) => isParticipantSelector(participants)(s)
    )
  ),
  withNavigation
)(EventItem);
