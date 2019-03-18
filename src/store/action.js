import { bookAction } from './actionType';
console.log(getState());
export const getBookMenuList = ( menuList ) => async (dispatch, getState, {
  dispatch({
    type:bookAction.BOOK_MENU_LIST,
    payload: Object.assign({}, getState().global.enuList, menuList)
  });
})