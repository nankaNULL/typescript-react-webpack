import _ from 'lodash';
import http from '@/utils/http';
import API_URL from './url';

function mapUrlObjToFuncObj(urlObj: any) {
    const API: any = {};
    // _.keys(urlObj)得到一个拿到所有对象名的数组，然后对这个数组遍历，key就是对象名
    _.keys(urlObj).forEach((key: string) => {
        API[key] = function(params: any) {
            const item = urlObj[key];
            // const newMethod = item.method;
            switch (item.method) {
                case 'get': return http.get(item.url, params);
                case 'post': return http.post(item.url, params);
                default:
            }
            // return http[newMethod](item.url, params)
        }
    })
    return API;
}

export const API = mapUrlObjToFuncObj(API_URL);
