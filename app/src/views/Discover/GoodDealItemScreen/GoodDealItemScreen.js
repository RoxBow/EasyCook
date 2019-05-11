import styles from './GoodDealItem.style';
import React from 'react';
import { View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Thumbnail } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { toggleInterested, toggleThumb } from '../../../redux/GoodDeal/actions';
import { currentGoodDealSelector } from '../../../redux/GoodDeal/selectors';
import { currentUsernameSelector } from '../../../redux/User/selectors';
import IconStar from '../../../components/Icons/IconStar';
import { serverUrl } from '../../../constants/global';
import { formatDate, combineSelectors } from '../../../constants/helpers';
import Text from '../../../components/Text/Text';
import HeadItem from '../../../components/HeadItem/HeadItem';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import ArrowBack from '../../../components/ArrowBack/ArrowBack';

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
    const { navigation, currentGoodDeal, toggleThumb } = this.props;

    const {
      storeName,
      date,
      creator,
      address,
      description,
      image,
      category,
      _id,
      thumbUp,
      thumbDown
    } = currentGoodDeal;

    return (
      <ScrollView>
        <HeadImage uri={`${serverUrl}/${image.uri}`} navigation={navigation} />
        <View style={styles.wrapperContent}>
          <HeadItem category={category} title={storeName} creator={creator} />
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

          <View>
            <Text>Avis de la communauté</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <ButtonIcon icon="thumb_up" size={22} onPress={() => toggleThumb(_id, true)} />
                <Text>{thumbUp.length}</Text>
              </View>
              <View>
                <ButtonIcon icon="thumb_down" size={22} onPress={() => toggleThumb(_id, false)} />
                <Text>{thumbDown.length}</Text>
              </View>
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
          <TouchableOpacity
            onPress={() => this._toggleUser()}
            style={[{ borderRightWidth: 1, borderColor: 'lightgrey' }, styles.btnAction]}
          >
            <IconStar isFill={this.isInterested()} />
            <Text style={styles.btnActionText}>Intéressé(e)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAction} onPress={() => {}}>
            <IconStar isFill={false} />

            <Text style={styles.btnActionText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = combineSelectors(currentUsernameSelector, (s, { navigation }) =>
  currentGoodDealSelector(navigation.state.params.idGoodDeal)(s)
);

const mapDispatchToProps = dispatch => ({
  toggleInterested: idGoodDeal => dispatch(toggleInterested(idGoodDeal)),
  toggleThumb: (idGoodDeal, isThumbUp) => dispatch(toggleThumb(idGoodDeal, isThumbUp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoodDealItem);
