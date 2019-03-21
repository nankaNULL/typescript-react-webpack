import { bookAction } from './actionType';
export const getBookMenuList = ( menuList: any ) => async (dispatch: any, getState: void, {API}: any) => {
  dispatch({
    type:bookAction.BOOK_MENU_LIST,
    payload: menuList
  });
}