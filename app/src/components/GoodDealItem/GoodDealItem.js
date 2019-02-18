import styles from './GoodDealItem.style';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconStar from '../Icons/IconStar';
import { serverUrl } from '../../constants/global';
import { currentUsernameSelector } from '../../redux/User/selectors';
import { compose } from 'recompose';
import { combineSelectors } from '../../constants/helpers';

class GoodDealItem extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToGoodDealItem = this.redirectToGoodDealItem.bind(this);
  }

  isInterested() {
    const { currentUsername, interested } = this.props;
    
    return !!interested.find(({ username }) => username === currentUsername);
  }

  redirectToGoodDealItem() {
    const dataGoodDealItem = this.props;

    this.props.navigation.navigate('GoodDealItem', {
      idGoodDeal: dataGoodDealItem._id
    });
  }

  render() {
    const { storeName, creator, image } = this.props;
    
    return (
      <TouchableOpacity style={styles.container} onPress={this.redirectToGoodDealItem}>
        <View style={styles.wrapper}>
          <Image style={styles.imageEvent} source={{ uri: `${serverUrl}/${image.uri}` }} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.nameText}>{storeName}</Text>
            <Text>Par {creator.username}</Text>
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
)(GoodDealItem);
