import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperKindIngredients: {
    marginLeft: 10
  },
  kindIngredient: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 10
  },
  kindIngredientSelected: {
    borderBottomColor: pink,
    borderBottomWidth: 3
  },
  textKindIngredient: {
    fontSize: 12,
    marginTop: 8
  },
  textKindIngredientSelected: {
    color: pink
  },

  textInfo: {
    fontSize: 16,
    marginVertical: 20,
    alignSelf: 'center',
    width: '70%',
    textAlign: 'center'
  },

  wrapperIngredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15
  },

  wrapperValidate: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: pink,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  wrapperNbrValidate: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  textValidate: {
    color: '#fff',
    fontSize: 16,
  }
});

export default styles;
