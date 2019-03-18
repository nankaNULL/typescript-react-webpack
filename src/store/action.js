import { bookAction } from './actionType';
export const getBookMenuList = ( menuList ) => async (dispatch, getState, {API}) => {
  dispatch({
    type:bookAction.BOOK_MENU_LIST,
    payload: menuList
  });
}