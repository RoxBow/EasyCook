import { isUserInArray } from '../../constants/helpers';
import { GOOD_DEAL } from './actions';
import { compose } from 'recompose';

const stateSelector = state => state[GOOD_DEAL];

export const goodDealsSelector = compose(
  ({ goodDeals }) => ({ goodDeals }),
  stateSelector
);

export const currentGoodDealSelector = idGoodDeal =>
  compose(
    currentGoodDeal => ({ currentGoodDeal }),
    ({ goodDeals }) => goodDeals.find(({ _id }) => _id === idGoodDeal),
    ({ goodDeals }) => ({ goodDeals }),
    stateSelector
  );

export const userGoodDealsSelector = idUser =>
  compose(
    userGoodDeals => ({ userGoodDeals }),
    ({ goodDeals }) =>
      goodDeals.filter(goodDeal => isUserInArray(goodDeal.interested, idUser) && goodDeal),
    ({ goodDeals }) => ({ goodDeals }),
    stateSelector
  );
