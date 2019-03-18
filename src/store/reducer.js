// emm store文件夹下面的reducer最好是全局的，（因为导出都只导出一个嘛）
// 其他局部的 放在对应的文件夹下面，然后在index的时候combine一下这样
// 这边先拿book的左边菜单栏的用下，待会把他放到子目录下
import { bookAction } from './actionType';
const initialState = {
  menuList: []
};
const globalReducer = ( state = initialState, action ) => {
  const { type, payload } = action;
  switch ( type ) {
    case bookAction.BOOK_MENU_LIST: 
      return Object.assign({}, state, {
        menuList: payload
      });
    default: return state;
  }
}
export default globalReducer;