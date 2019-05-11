import styles from './Comments.style';
import React from 'react';
import { View } from 'react-native';
import { Thumbnail } from 'native-base';
import Rating from '../Rating/Rating';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { serverUrl, DATE } from '../../constants/global';
import { connect } from 'react-redux';
import { currentUsernameSelector } from '../../redux/User/selectors';
import { deleteComment } from '../../redux/Recipe/actions';

const isOwnComment = (user, currentUsername) => user.username === currentUsername;
const formatDateComment = date => `${DATE.shortMonth[date.getMonth()]} ${date.getFullYear()}`;

const Comments = ({ comments, currentUsername, idRecipe, deleteComment }) => (
  <View>
    {comments.map(({ _id, text, user, rating, created_at }) => (
      <View key={_id} style={styles.wrapperComment}>
        <View style={styles.wrapperHeadComment}>
          <View style={{ flexDirection: 'row' }}>
            <Thumbnail medium source={{ uri: `${serverUrl}/${user.avatar.uri}` }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.username} medium>{user.username}</Text>
              <Text>{formatDateComment(new Date(created_at))}</Text>
            </View>
          </View>
          <Rating selected={rating} disabled />
        </View>

        <Text style={styles.commentText}>{text}</Text>

        <View style={styles.wrapperActionComment}>
          {isOwnComment(user, currentUsername) && (
            <Button
              text="Supprimer"
              onPress={() => deleteComment(idRecipe, _id)}
              style={[styles.btnAction, styles.btnDelete]}
              styleText={styles.textBtnDelete}
              transparent
            />
          )}
          <Button text="Signaler" style={styles.btnAction} transparent />
        </View>
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
