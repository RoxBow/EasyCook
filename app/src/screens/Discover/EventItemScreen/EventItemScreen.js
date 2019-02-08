import styles from './eventitemscreen.style';
import React from 'react';
import { Text, View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Thumbnail } from 'native-base';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { toggleParticipate, toggleInterested } from '../../../redux/Event/actions';
import { currentEventSelector } from '../../../redux/Event/selectors';
import IconStar from '../../../components/Icons/IconStar';
import { serverUrl } from '../../../constants/global';
import ListAvatar from '../../../components/ListAvatar/ListAvatar';

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.formatDate = this.formatDate.bind(this);
    this._toggleUser = this._toggleUser.bind(this);
    this.isParticipant = this.isParticipant.bind(this);
    this.isInterested = this.isInterested.bind(this);
  }

  formatDate(date) {
    date = new Date(date);
    date = date.getDate();
  }

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

    const { name, date, creator, address, description, price, participants, image } = currentEvent;

    return (
      <ScrollView>
        <Header style={{ height: 200 }} transparent>
          <ImageBackground
            source={{ uri: `${serverUrl}/${image.uri}` }}
            style={{ width: '100%', height: '100%' }}
          >
            <AntDesign
              size={26}
              name="arrowleft"
              style={{ padding: 8 }}
              onPress={() => navigation.goBack()}
            />
          </ImageBackground>
        </Header>
        <View style={styles.wrapperContent}>
          <View style={styles.headContent}>
            <Text style={styles.eventName}>{name}</Text>
            <Thumbnail small source={{ uri: `${serverUrl}/${creator.avatar.uri}` }} />
            <Text style={styles.proposedBy}>proposée par {creator.username}</Text>
          </View>
          <View style={styles.wrapperInfo}>
            <View style={styles.info}>
              <AntDesign size={22} name="calendar" style={styles.iconInfo} />
              <Text>{date}</Text>
            </View>
            <View style={styles.info}>
              <Entypo name="location-pin" size={22} style={styles.iconInfo} />
              <Text>{address}</Text>
            </View>
            <View style={styles.info}>
              <Entypo name="price-tag" size={22} style={styles.iconInfo} />
              <Text>{price === 0 ? 'Gratuit' : `${price}€`}</Text>
            </View>
          </View>

          <View style={styles.wrapperParticipants}>
            {participants && participants.length ? (
              <View style={{ flex: 1, width: '100%' }}>
                <ListAvatar listUser={ participants } />
                <Text>{participants.length} y participent</Text>
              </View>
            ) : (
              <Text>Aucun inscrit pour le moment</Text>
            )}
          </View>

          <View style={styles.wrapperAbout}>
            <View style={styles.wrapperDescription}>
              <Text>A propos</Text>
              <Text>{description}</Text>
            </View>
            <View style={styles.wrapperAboutInfo}>
              <Thumbnail source={{ uri: `${serverUrl}/${creator.avatar.uri}` }} />
              <View style={styles.aboutInfo}>
                <Text style={styles.aboutInfoText}>Organisateur</Text>
                <Text style={styles.aboutInfoText}>{creator.username}</Text>
                <Text style={styles.aboutInfoText}>{creator.bio}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <Button
            onPress={() => this._toggleUser('interested')}
            style={[{ borderRightWidth: 1, borderColor: 'lightgrey' }, styles.btnAction]}
          >
            <IconStar isFill={this.isInterested()} size={22} />
            <Text style={styles.btnActionText}>Intéressé(e)</Text>
          </Button>
          <Button style={styles.btnAction} onPress={() => this._toggleUser('participate')}>
            <MaterialCommunityIcons
              name={this.isParticipant() ? 'check-circle' : 'check-circle-outline'}
              size={22}
            />

            <Text style={styles.btnActionText}>J'y participe</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, { navigation }) => ({
  currentUsername: state.user.info.username,
  currentEvent: currentEventSelector(state.event.events, navigation.state.params.idEvent)
});

const mapDispatchToProps = dispatch => ({
  toggleParticipate: idEvent => dispatch(toggleParticipate(idEvent)),
  toggleInterested: idEvent => dispatch(toggleInterested(idEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventItem);