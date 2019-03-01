import styles from './Comments.style';
import React from 'react';
import { View } from 'react-native';
import { Thumbnail, Button } from 'native-base';
import Rating from '../Rating/Rating';
import Text from '../Text/Text';
import { serverUrl } from '../../constants/global';
import { connect } from 'react-redux';
import { currentUsernameSelector } from '../../redux/User/selectors';
import { deleteComment } from '../../redux/Recipe/actions';

const isOwnComment = (user, currentUsername) => user.username === currentUsername;

const Comments = ({ comments, currentUsername, idRecipe, deleteComment }) => (
  <View>
    {comments.map(({ _id, text, user, rating }, i) => (
      <View key={i} style={styles.wrapperComment}>
        <View style={styles.wrapperHeadComment}>
          <View style={{ flexDirection: 'row' }}>
            <Thumbnail medium source={{ uri: `${serverUrl}/${user.avatar.uri}` }} />
            <Text style={styles.commentText}>{user.username}</Text>
          </View>
          {isOwnComment(user, currentUsername) && (
            <Button onPress={() => deleteComment(idRecipe, _id)}>
              <Text>Supprimer</Text>
            </Button>
          )}
          <Rating selected={rating} disabled={true} />
        </View>
        <Text style={{ fontSize: 18 }}>{text}</Text>
      </View>
    ))}
  </View>
);

export default connect(
  currentUsernameSelector,
  dispatch => ({
    deleteComment: (idRecipe, idComment) => dispatch(deleteComment(idRecipe, idComment))
  })
)(Comments);
