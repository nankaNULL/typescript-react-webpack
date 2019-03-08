import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../mainLayout';
import './style.scss';
const { Header, Sider, Content, Footer } = Layout;

export default class CommonLayout extends React.PureComponent{
  state = {
    siderBarData: [{
      title: '图书排行',
      url: '/common/bookRank'
    },{
      title: '图书排行1',
      url: '/common/bookRank1'
    },{
      title: '图书排行2',
      url: '/common/bookRank2'
    }],
  };

  render () {
    const { siderBarData } = this.state;
    return (
      <MainLayout className="layout-common">
        <Sider className="sider">
          <Menu theme="dark" defaultSelectedKeys={['1']} >
            {siderBarData.map((item, index) => (
              <Menu.Item key={index}><Link to={item.url}>{item.title}</Link></Menu.Item>
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