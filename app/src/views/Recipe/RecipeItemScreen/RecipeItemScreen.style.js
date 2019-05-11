import { StyleSheet } from 'react-native';
import { pink, lightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperContent: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -50
  },
  titleLine: {
    marginBottom: 15
  },

  wrapperInfoIntro: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: lightgrey
  },
  elementInfoIntro: {
    alignItems: 'center'
  },
  elementInfoIntroText: {
    marginTop: 5
  },

  wrapperIngredients: {
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center'
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
  },

  wrapperRatingCommentAdded: {
    backgroundColor: "#d8d8d8",
    width: '95%',
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  inputComment: {
    height: 150,
    alignItems: 'flex-start',
    width: '95%',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 10,
    alignSelf: 'center'
  }
});

export default styles;
