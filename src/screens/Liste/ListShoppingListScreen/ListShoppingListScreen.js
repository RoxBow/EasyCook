import styles from './listshoppinglistscreen.style';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import ShoppingListItem from '../../../components/ShoppingListItem/ShoppingListItem';
import { isArrayFill } from '../../../constants/helpers';
import Empty from '../../../components/Empty/Empty';
import { fetchShoppingList, setFetch } from '../../../redux/User/actions';
import { connect } from 'react-redux';

class ListShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchShoppingList();
  }

  render() {
    const { shoppingLists, isFetching } = this.props;

    return isArrayFill(shoppingLists) && !isFetching ? (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {shoppingLists.map((shoppingList, i) => (
            <ShoppingListItem {...shoppingList} key={i} />
          ))}
        </ScrollView>
      </View>
    ) : (
      <Empty name={'liste de course'} />
    );
  }
}

const mapStateToProps = state => ({
  shoppingLists: state.user.info.shoppingLists,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchShoppingList: () => dispatch(fetchShoppingList()),
  setFetch: (ok) => dispatch(setFetch(ok))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShoppingListScreen);
