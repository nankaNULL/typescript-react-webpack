import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';
const { Header, Content, Footer } = Layout;

export default class MainLayout extends React.PureComponent{
  static defaultProps = {
    className:''
  }
  state = {
    topNavData: [{
      title: '首页',
      url: '/home'
    },{
      title: '列表',
      url: '/list'
    },{
      title: '排行',
      url: '/common'
    }],
  };
  render () {
    const { topNavData } = this.state;
    const { location: { pathname }, className } = this.props;
    return (
      <Layout className={`${className} layout-main`}>
        <Header className="header">
          <div className="header-logo">LOGO</div>
          <Menu 
            mode="horizontal" 
            selectedKeys={topNavData.filter((topNav) => pathname.indexOf(topNav.url)>-1).map((topNav) => topNav.url)}>
            {topNavData.map((item) => (
              <Menu.Item className="top-nav-item" key={item.url}><Link to={item.url}>{item.title}</Link></Menu.Item>
            ))}
          </Menu>
        </Header>
        <Layout className="content">
          {this.props.children}
        </Layout>
        <Footer className="footer">
          <div>来自鱼丸 - 2019</div>
        </Footer>
      </Layout>
    )
  }
}