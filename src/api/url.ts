export default {
  getTheData: {
    method: 'get',
    url: 'https://api.github.com/users/chriscoyier/repos'
  },
  getErrData: {
    method: 'get',
    url: 'https://api.github.com/users/chrissycoyier/repos'
  },

  /**
   * 用户登录
   */

  // 登录
  userLogin: {
    method: 'post',
    url: '/api/user/login'
  },

  // 获取用户信息
  getUserInfo: {
    method: 'get',
    url: '/api/user/info'
  },

  getToken: {
    method: 'get',
    url: '/api/user/token'
  },

  // 登出
  userLogout: {
    method: 'post',
    url: '/api/user/logout'
  }
}