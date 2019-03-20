import 'whatwg-fetch';
import { getResponse } from './interceptor'

class Http{
  get(url, params) {
    const options = { method:'GET'};
    const newUrl = params ? this.buildPath(url, params) : url;
    return this.request(newUrl, options)
  }

  post(url, body) {
    let options = { method:'POST'};
    if (body) options.body = JSON.stringify(body);
    options.headers = this.defaultHeader()
    return this.request(url, options)
  }

  request(url, options) {
    return fetch(url, options)
    .then(getResponse) // 我这里把他单独拿出去了
    .then(response => {
      // 他这里没有直接在上面返回response.json()是因为还想做一个loading false的操作
      // 我这里没做，其实放上面，可能，也不是不可以啊
      return response.json()
    })
    .then(data => {
      // 这里才算真的把data值返回了回去
      return data;
    })
    .catch(err => {
      // 异常处理
      if (err === 401) {
        message.warn('您还没有登录或登录已过期，请登录!');
        setTimeout(() => {
            const url = `${LOGAPICONF.LOGINURL}`;
            this.redirectWay(url)
        }, 1000);
      } else if (err=== 403 || err === 402) {
        window.location.href = '/home'; 
      } else if (err === 404) {
        window.location.href = '/list';
      } else {
        message.error(`请求错误`);
      }
    })
  }
  
  buildPath(url, params){
    const ps = [];
    if (params) {
      for(let p in params) {
        if (p) ps.push(p +'=' + encodeURIComponent(params[p]))
      }
    } 
    return url + '?' + ps.join('&');
  }

  defaultHeader() {
    return {
      'Accept': '*/*',
      // mode: 'cors',
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
}

export default new Http();