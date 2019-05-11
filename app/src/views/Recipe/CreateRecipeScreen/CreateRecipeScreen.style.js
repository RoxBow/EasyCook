import { StyleSheet } from 'react-native';
import { pink, lightgrey } from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperSelect: {
    borderColor: lightgrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 30,
    paddingLeft: 60
  },
  select: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    padding: 0
  },
  iconSelect: {
    position: 'absolute',
    top: 15,
    left: 25
  },
  textSelect: {
    marginRight: 5
  },

  wrapperSelectTag: {
    paddingLeft: 60,
    paddingRight: 10,
    borderColor: lightgrey,
    borderBottomWidth: 1,
    paddingVertical: 15
  },
  wrapperTitleSelectTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2
  },
  iconTitleSelectTag: {
    position: 'absolute',
    top: 15,
    left: 25
  },
  wrapperListTag: {
    flexDirection: 'row',
    marginTop: 8
  },

  step: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-between'
  },
  wrapperStepText: {
    flexDirection: 'row',
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

  wrapperIngredient: {
    flexDirection: 'column',
    alignItems: 'center'
  },

  btnAddStep: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
    paddingVertical: 15
  }
});

export default styles;
