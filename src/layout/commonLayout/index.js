import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../mainLayout';
import './style.scss';
const { Header, Sider, Content, Footer } = Layout;

export default class CommonLayout extends React.PureComponent{
  state = {
    siderBarData: [{
      title: '图书排行1',
      url: '/common/bookRank1'
    },{
      title: '图书排行2',
      url: '/common/bookRank2'
    },{
      title: '图书排行3',
      url: '/common/bookRank3'
    }],
  };

  render () {
    console.log(this.props)
    const { siderBarData } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <MainLayout className="layout-common">
        <Sider className="sider">
          <Menu
            theme="dark" 
            selectedKeys={siderBarData.filter((siderBar) => pathname.indexOf(siderBar.url)>-1).map((siderBar) => siderBar.url)}>
            {siderBarData.map((item) => (
              <Menu.Item key={item.url}><Link to={item.url}>{item.title}</Link></Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content>
          {this.props.children}
        </Content>
      </MainLayout>
    )
  }
}