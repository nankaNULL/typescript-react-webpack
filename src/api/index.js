import http from './http';
export default{
  getTheData(params){
    return http.get('https://api.github.com/users/chriscoyier/repos', params)
  },
  getErrData(params){
    return http.get('https://api.github.com/users/chrissycoyier/repos', params);
  }
}