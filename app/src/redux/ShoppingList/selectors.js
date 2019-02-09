export const currentShoppingListSelector = (shoppingList, idShoppingListItem) =>
  shoppingList.find(({ _id }) => _id === idShoppingListItem);


export const usersSelector = (users = []) => users.sort((a, b) => {
  const nameA = a.username.toLowerCase();
  const nameB = b.username.toLowerCase();

  if (nameA < nameB)
   return -1;
  if (nameA > nameB)
   return 1;
   
  return 0;
 });