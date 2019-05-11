export const updateAllActionName = storeName => `${storeName}/UPDATE_ALL`;
export const updateOneActionName = storeName => `${storeName}/UPDATE_ONE`;
export const add = storeName => `${storeName}/ADD`;

export const updateAllAction = storeName => list => ({
  type: updateAllActionName(storeName),
  list
});

export const updateOneAction = storeName => state => {
  const updatedList = state[storeName].list.map(item => {
    if (item._id === action.item._id) {
      return action.item;
    }

    return item;
  });

  return {
    type: updateAllActionName(storeName),
    list: updatedList
  };
};
