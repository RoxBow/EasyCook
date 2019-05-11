import styles from './Eventitemscreen.style';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Thumbnail } from 'native-base';
import { toggleParticipate, toggleInterested } from '../../../redux/Event/actions';
import { currentEventSelector } from '../../../redux/Event/selectors';
import { currentUsernameSelector } from '../../../redux/User/selectors';
import IconStar from '../../../components/Icons/IconStar';
import IconCheck from '../../../components/Icons/IconCheck';
import { serverUrl } from '../../../constants/global';
import ListAvatar from '../../../components/ListAvatar/ListAvatar';
import Icon from '../../../components/Icon/Icon';
import { combineSelectors, formatDate } from '../../../constants/helpers';
import { compose } from 'recompose';
import Text from '../../../components/Text/Text';
import HeadItem from '../../../components/HeadItem/HeadItem';
import HeadImage from '../../../components/HeadImage/HeadImage';

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._toggleUser = this._toggleUser.bind(this);
    this.isParticipant = this.isParticipant.bind(this);
    this.isInterested = this.isInterested.bind(this);
  }

  static navigationOptions = { tabBarVisible: false };

  _toggleUser(interestedOrParticipate) {
    const { idEvent } = this.props.navigation.state.params;
    const { toggleInterested, toggleParticipate } = this.props;

    if (interestedOrParticipate === 'interested') {
      toggleInterested(idEvent);
    } else if (interestedOrParticipate === 'participate') {
      toggleParticipate(idEvent);
    }
  }

  isParticipant() {
    const { currentUsername, currentEvent } = this.props;
    const { participants } = currentEvent;

    return !!participants.find(({ username }) => username === currentUsername);
  }

  isInterested() {
    const { currentUsername, currentEvent } = this.props;
    const { interested } = currentEvent;

    return !!interested.find(({ username }) => username === currentUsername);
  }

  render() {
    const { navigation, currentEvent } = this.props;

    const {
      name,
      date,
      creator,
      address,
      description,
      price,
      participants,
      image,
      category
    } = currentEvent;
    const dateInDate = new Date(date);

    return (
      <ScrollView contentContainerStyle={{ minHeight: '100%'}}>
        <HeadImage uri={`${serverUrl}/${image.uri}`} navigation={navigation} />
        <View style={styles.wrapperContent}>
          <HeadItem category={category} title={name} creator={creator} />

          <View style={styles.wrapperInfo}>
            <View style={styles.info}>
              <Icon icon="date" size={22} style={styles.iconInfo} />
              <View>
                <Text>{formatDate(dateInDate)}</Text>
                <Text>{`${dateInDate.getHours()}:${dateInDate.getMinutes()}`}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Icon icon="location" size={22} style={styles.iconInfo} />
              <Text>{address}</Text>
            </View>
            <View style={styles.info}>
              <Icon icon="price" size={22} style={styles.iconInfo} />
              <Text>{price === "0" ? 'Gratuit' : `${price}€`}</Text>
            </View>
          </View>

          <View style={styles.wrapperParticipants}>
            {participants && participants.length ? (
              <View style={{ flex: 1, width: '100%' }}>
                <ListAvatar listUser={participants} />
                <Text>{participants.length} participant(s)</Text>
              </View>
            ) : (
              <Text>Aucun inscrit pour le moment</Text>
            )}
          </View>

          <View style={styles.wrapperAbout}>
            <View style={styles.wrapperDescription}>
              <Text style={{ marginBottom: 6 }} medium>
                A propos
              </Text>
              <Text>{description}</Text>
            </View>
            <View style={styles.wrapperAboutInfo}>
              <Thumbnail source={{ uri: `${serverUrl}/${creator.avatar.uri}` }} />
              <View style={styles.aboutInfo}>
                <Text style={styles.aboutInfoText} medium>
                  Organisateur
                </Text>
                <Text style={styles.aboutInfoText} medium>
                  {creator.username}
                </Text>
                <Text style={styles.aboutInfoText}>{creator.bio}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <TouchableOpacity
            onPress={() => this._toggleUser('interested')}
            style={[{ borderRightWidth: 1, borderColor: 'lightgrey' }, styles.btnAction]}
          >
            <IconStar isFill={this.isInterested()} />
            <Text style={styles.btnActionText}>Intéressé(e)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnAction}
            onPress={() => this._toggleUser('participate')}
          >
          <IconCheck isChecked={this.isParticipant()} />
            <Text style={styles.btnActionText}>J'y participe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = combineSelectors(currentUsernameSelector, (s, { navigation }) =>
  currentEventSelector(navigation.state.params.idEvent)(s)
);

const mapDispatchToProps = dispatch => ({
  toggleParticipate: idEvent => dispatch(toggleParticipate(idEvent)),
  toggleInterested: idEvent => dispatch(toggleInterested(idEvent))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventItem);
