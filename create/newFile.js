const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let newName = '', newPath = '', template = '';

// 重命名
componentRename = (answer) => {
  newName = answer;
  newPath = path.resolve('./src/components/', newName);
  template = `import React from 'react';
import PropTypes from 'prop-types';

export default class ${newName} extends React.PureComponent{
  static defaultProps = {

  };
  static propsTypes = {

  };
  
  render () {
    return (
      <div className="page-component-${newName}">
        ${newName}
      </div>
    )
  }
}`
}

// 重命名
pageRename = (answer) => {
  newName = answer;
  newPath = path.resolve('./src/pages/', newName);
  template = `import React from 'react';

export default class ${newName} extends React.PureComponent{
  render () {
    return (
      <div className="page-${newName}">
        ${newName}
      </div>
    )
  }
}`
}

// 输入组件名
let promise = new Promise((resolve, reject) => {
  rl.question('请输入'+ (process.argv[2] === 'component' ? '组件名': '文件名') + ': ' , (answer) => {
    process.argv[2] === 'component' ? componentRename(answer) : pageRename(answer); 
    resolve();
  });
})

// 新建文件夹
let promise1 = () => new Promise((resolve, reject) => {
  fs.mkdir(newPath, { recursive: false }, (err) => {
    if (err) reject(err);
    resolve("test2");
  })
})

// 文件夹新建成功后，新建对应index文件
let promise2 = () => new Promise((resolve, reject) => {
  fs.writeFile(`${newPath}/index.js`, template, (err) => {
    if(err) reject(err);
    resolve('写入成功');
  })
})

// 执行
promise.then(promise1)
.then(promise2)
.then((res) => {
  console.log(res)
  rl.close();
})
.catch((res) => {
  if (res.code === 'EEXIST') {
    console.log("文件名已存在")
  }
  rl.close();
})