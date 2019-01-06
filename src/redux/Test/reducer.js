import { SEND_TEST } from './actions';

const initialState = {
  value: false,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_TEST:
      return {
        ...state,
        value: action.test
      };
    default:
      return state;
  }
};

export default testReducer;
