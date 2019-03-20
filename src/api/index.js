import _ from 'lodash';
import http from '@/utils/http';
import API_URL from './url';

function mapUrlObjToFuncObj(urlObj){
  let API = {};
  // _.keys(urlObj)得到一个拿到所有对象名的数组，然后对这个数组遍历，key就是对象名
  _.keys(urlObj).forEach(key => {
    API[key] = function(params){
      let item = urlObj[key];
      return http[item.method](item.url, params)
    }
  })
  return API;
}

export const API = mapUrlObjToFuncObj(API_URL);
