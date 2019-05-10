import React from 'react';
import { Card, Button } from '@alifd/next';


export default class Home extends React.PureComponent{
  state = {
    isCollect: false
  }

  handleClick = () => {
    this.setState({isCollect: !this.state.isCollect})
  }

  render () {
    const { isCollect } = this.state;
    let emm = {};
    let emm1 = null;
    let emm2 = {
      test: 1
    };
    let emm3 = Object(emm2)
    let str = "11";
    let str1 = "11s";
    let num = 1.11;
    let bool = true
    console.log(emm, Boolean(emm), Boolean(emm1))
    console.log(isNaN(emm2), isNaN(emm2.test))
    console.log(emm2.toString(),emm2.test.toString())
    console.log(emm3,emm3.isPrototypeOf(emm2), emm3.isPrototypeOf(emm))
    console.log(++str,++str1,++num,++bool)
    return (
      <div className="page-home" style={{padding: 20, background:'#fff'}}>
        <Card title="fusion design 效果测试">
          <Button type="normal" className="mr-10">Normal</Button>
          <Button type="primary" className="mr-10">Prirmary</Button>
          <Button type="secondary">Secondary</Button>
        </Card>
        <Card title="iconfont 效果测试" className="color-primary">
          <p><i className="yuwan icon-bilibili"> LOGO </i></p>
          <p><i className="yuwan icon-zhiboguankanshu"> 观看人数 </i></p>
          <p><i className="yuwan icon-Bbi"> 投币 </i></p>

          <p><i className={'pointer yuwan ' + (isCollect ? "icon-shoucangtianchong" : "icon-shoucang")} onClick={this.handleClick}> 收藏 </i></p>
          <p><i className="yuwan icon-zan"> 点赞 </i></p>
        </Card>
      </div>
    )
  }
}
