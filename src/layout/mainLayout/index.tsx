import * as React from 'react';
import { Menu, Layout, Button } from "antd";
import { Link } from 'react-router-dom';
import { MainLayoutState } from '../../constants/interfaces'
import './style.scss';
const { Header, Content, Footer } = Layout;

export default class MainLayout extends React.PureComponent<any, MainLayoutState>{
  constructor(props: any) {
    super(props);
    this.state = {
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
  }
  static defaultProps = {
    className:''
  }
 
  render () {
    const { topNavData } = this.state;
    const { location: { pathname }, className } = this.props;
    return (
      <div>
        <Layout className={`${className} layout-main`}>
          <Header className="header">
            <div className="header-logo">LOGO</div>
            <Menu 
              mode="horizontal" 
              selectedKeys={topNavData.filter((topNav: any) => pathname.indexOf(topNav.url)>-1).map((topNav: any) => topNav.url)}>
              {topNavData.map((item: any) => (
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
      </div>
    )
  }
}