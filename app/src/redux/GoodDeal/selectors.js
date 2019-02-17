import { isUserInArray } from '../../constants/helpers';

export const currentGoodDealSelector = (goodDeals, idGoodDeal) =>
  goodDeals.find(({ _id }) => _id === idGoodDeal);

export const userGoodDealsSelector = (goodDeals, idUser) =>
  goodDeals.filter(goodDeal => {
    if (isUserInArray(goodDeal.interested, idUser)) return goodDeal;
  });
