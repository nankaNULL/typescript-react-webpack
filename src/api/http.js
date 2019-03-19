import 'whatwg-fetch';
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
    .then(res => {
      if(res.ok){
        return res;
      } else {
        throw res.status;
      }
    })
    .then(response => {
      // 他这里没有直接在上面返回response.json()是因为还想做一个loading false的操作
      // 我这里没做，其实放上面，可能，也不是不可以啊
      // https://www.cnblogs.com/libin-1/p/6853677.html
      // 转为json格式才能拿到数据
      return response.json()
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log('error is',err)
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
      // 'Accept': '*/*',
      // 'Content-Type': 'application/json;charset=UTF-8',
      'Accept': '*/*',
      mode: 'cors',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*'
    }
  }
}

export default new Http();