import styles from './listshoppinglistscreen.style';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Root } from 'native-base';
import ShoppingListItem from '../../../components/ShoppingListItem/ShoppingListItem';
import { isArrayFill, combineSelectors } from '../../../constants/helpers';
import Empty from '../../../components/Empty/Empty';
import { fetchShoppingList, setFetch } from '../../../redux/ShoppingList/actions';
import { shoppingListSelector, isFetchingSelector } from '../../../redux/ShoppingList/selectors';
import { connect } from 'react-redux';
import Text from '../../../components/Text/Text';

class ListShoppingListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchShoppingList();
  }

  filteredShoppingList() {
    const { shoppingLists } = this.props;
    const pinnedShoppingList = shoppingLists.filter(({ isPin }) => isPin);
    const notPinnedShoppingList = shoppingLists.filter(({ isPin }) => !isPin);

    return {
      pinnedShoppingList,
      notPinnedShoppingList
    };
  }

  render() {
    const { shoppingLists, isFetching } = this.props;

    return isArrayFill(shoppingLists) && !isFetching ? (
      <Root>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.wrapper}>
            <Text style={styles.title} medium>Épinglée</Text>
            <View style={styles.wrapperShoppingList}>
              {this.filteredShoppingList().pinnedShoppingList &&
                this.filteredShoppingList().pinnedShoppingList.map((shoppingList, i) => (
                  <ShoppingListItem {...shoppingList} key={i} />
                ))}
            </View>
            <Text style={styles.title}>Autres</Text>
            <View style={styles.wrapperShoppingList}>
              {this.filteredShoppingList().notPinnedShoppingList &&
                this.filteredShoppingList().notPinnedShoppingList.map((shoppingList, i) => (
                  <ShoppingListItem {...shoppingList} key={i} />
                ))}
            </View>
          </ScrollView>
        </View>
      </Root>
    ) : (
      <Empty name={'liste de course'} />
    );
  }
}

const mapStateToProps = combineSelectors(
  shoppingListSelector,
  isFetchingSelector
);

const mapDispatchToProps = dispatch => ({
  fetchShoppingList: () => dispatch(fetchShoppingList()),
  setFetch: stateFetch => dispatch(setFetch(stateFetch))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShoppingListScreen);
