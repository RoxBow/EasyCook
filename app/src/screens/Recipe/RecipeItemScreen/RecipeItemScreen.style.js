import { StyleSheet } from 'react-native';
import { pink } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperContent: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15
  },
  titleLine: {
    marginBottom: 15
  },

  wrapperInfoIntro: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  elementInfoIntro: {
    alignItems: 'center'
  },

  wrapperIngredients: {
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  wrapperIngredient: {
    marginVertical: 8
  },

  containerEquipments: {
    marginVertical: 15,
    alignItems: 'center'
  },
  wrapperEquipments: {
    flexDirection: 'row'
  },
  equipment: {
    marginHorizontal: 10,
    alignItems: 'center'
  },

  containerSteps: {
    marginVertical: 15
  },
  step: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  numberStep: {
    fontSize: 13,
    lineHeight: 28,
    width: 30,
    height: 30,
    borderRadius: 15,
    color: pink,
    borderColor: pink,
    borderWidth: 1,
    textAlign: 'center',
    marginRight: 15
  },

  btnRecipeCalendar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: pink,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 2
  }
});

export default styles;
