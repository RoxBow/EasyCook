export const currentGoodDealSelector = (goodDeals, idGoodDeal) => goodDeals.find(({ _id }) => _id === idGoodDeal);
