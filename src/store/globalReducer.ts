import { createActionType } from '@/store/actionType';
import { message } from 'antd';
const actionType = createActionType([
  'USER_LOGIN',
  'GET_USER_INFO'
])

const initialState = {
  user_token: '',
  userInfo: {}
}

export const globalActions = {
  // 登录
  userLogin: (params: any) => async (dispatch: any, getState: void, { API }: any) => {
    API.userLogin(params).then((res: any) => {
      const { result, result_message, data } = res;
      if (!result) {
        return message.error(result_message)
      }
      message.success(result_message);
      /* token */
      if (data) {
        dispatch({
          type: actionType.USER_LOGIN,
          payload: res.data.token
        });
      }
    })
  },

  // 获取用户信息
  fetchUserInfo: () => async (dispatch: any, getState: void, { API }: any) => {
    API.getUserInfo().then((res: any) => {
      const { result, result_message, data } = res;
      if (!result) {
        return message.error(result_message)
      }
      dispatch({
        type: actionType.GET_USER_INFO,
        payload: data
      });
    })
  },
}


export const globalReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.USER_LOGIN:
      return Object.assign({}, state, {
        user_token: payload
      });
    case actionType.GET_USER_INFO:{
      return Object.assign({}, state, {
        userInfo: payload
      });
    }

    default: return state;
  }
}