import styles from './eventitemscreen.style';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';

class EventItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      name,
      date,
      creator,
      address,
      description,
      isFav,
      price,
      participants
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.eventName}>{name}</Text>
        <Text style={styles.proposedBy}>proposée par {creator.username}</Text>

        <View style={styles.wrapperInfo}>
          <View style={styles.info}>
            <Text>{date}</Text>
          </View>
          <View style={styles.info}>
            <Text>{address}</Text>
          </View>
          <View style={styles.info}>
            <Text>{address}</Text>
          </View>
        </View>

        <View style={styles.participants}>
          <Text>{participants.length} y participent</Text>
        </View>

        <View style={styles.wrapperAbout}>
          <View>
            <Text>CREATOR AVATAR</Text>
            <View>
              <Text>Organisateur</Text>
              <Text>{creator.name}</Text>
              <Text>{creator.bio}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapperActions}>
          <Button>
            Intéressé(e)
          </Button>
          <Button>
            J'y participe
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(EventItem);
