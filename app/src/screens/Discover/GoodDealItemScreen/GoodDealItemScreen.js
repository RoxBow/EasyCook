import styles from './GoodDealItem.style';
import React from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Header, Thumbnail } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { toggleInterested } from '../../../redux/GoodDeal/actions';
import { currentGoodDealSelector } from '../../../redux/GoodDeal/selectors';
import IconStar from '../../../components/Icons/IconStar';
import { serverUrl } from '../../../constants/global';
import { formatDate } from '../../../constants/helpers';
import Text from '../../../components/Text/Text';

class GoodDealItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._toggleUser = this._toggleUser.bind(this);
    this.isInterested = this.isInterested.bind(this);
  }

  _toggleUser() {
    const { idGoodDeal } = this.props.navigation.state.params;
    const { toggleInterested } = this.props;

    toggleInterested(idGoodDeal);
  }

  isInterested() {
    const { currentUsername, currentGoodDeal } = this.props;
    const { interested } = currentGoodDeal;

    return !!interested.find(({ username }) => username === currentUsername);
  }

  render() {
    const { navigation, currentGoodDeal } = this.props;

    const { storeName, date, creator, address, description, image } = currentGoodDeal;

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
            <Text style={styles.eventName}>{storeName}</Text>
            <Thumbnail small source={{ uri: `${serverUrl}/${creator.avatar.uri}` }} />
            <Text style={styles.proposedBy}>proposée par {creator.username}</Text>
          </View>
          <View style={styles.wrapperInfo}>
            <View style={styles.info}>
              <AntDesign size={22} name="calendar" style={styles.iconInfo} />
              <Text>{formatDate(new Date(date))}</Text>
            </View>
            <View style={styles.info}>
              <Entypo name="location-pin" size={22} style={styles.iconInfo} />
              <Text>{address}</Text>
            </View>
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
            onPress={() => this._toggleUser()}
            style={[{ borderRightWidth: 1, borderColor: 'lightgrey' }, styles.btnAction]}
          >
            <IconStar isFill={this.isInterested()} />
            <Text style={styles.btnActionText}>Intéressé(e)</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, { navigation }) => ({
  currentUsername: state.user.info.username,
  currentGoodDeal: currentGoodDealSelector(state.goodDeal.goodDeals, navigation.state.params.idGoodDeal)
});

const mapDispatchToProps = dispatch => ({
  toggleInterested: idGoodDeal => dispatch(toggleInterested(idGoodDeal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoodDealItem);
