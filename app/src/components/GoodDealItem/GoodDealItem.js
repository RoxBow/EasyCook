import styles from './GoodDealItem.style';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import IconStar from '../Icons/IconStar';
import { serverUrl } from '../../constants/global';

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
          <IconStar isFill={this.isInterested()} size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  currentUsername: state.user.info.username
});

export default withNavigation(connect(mapStateToProps)(GoodDealItem));
