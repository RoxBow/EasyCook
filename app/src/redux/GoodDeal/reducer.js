import {
  SET_MESSAGE_INFO,
  SET_ERROR,
  UPDATE_GOOD_DEALS,
  ADD_GOOD_DEAL,
  SET_FETCH,
  UPDATE_GOOD_DEAL
} from './actions';

const initialState = {
  goodDeals: [],
  error: ''
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE_INFO:
      return {
        ...state,
        messageInfo: action.messageInfo
      };
    case SET_FETCH:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case UPDATE_GOOD_DEALS:
      return {
        ...state,
        goodDeals: action.goodDeals
      };
    case UPDATE_GOOD_DEAL:
      const updatedGoodDeals = state.goodDeals.map(goodDeal => {
        if (goodDeal._id === action.goodDeal._id) {
          return action.goodDeal;
        }

        return goodDeal;
      });

      return {
        ...state,
        goodDeals: updatedGoodDeals
      };
    case ADD_GOOD_DEAL:
      return {
        ...state,
        goodDeals: [...state.goodDeals, action.goodDeal]
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default eventReducer;
