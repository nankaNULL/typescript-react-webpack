import * as React from 'react';
import { Menu, Layout, Button } from "antd";
import { Link } from 'react-router-dom';
import './style.scss';
const { Header, Content, Footer } = Layout;

interface IState {
  topNavData: any;
}

interface IProps {
  className: string;
  location: any;
}
export default class MainLayout extends React.PureComponent<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      topNavData: [{
        title: '首页',
        url: '/home'
      }, {
        title: '列表',
        url: '/list'
      }, {
        title: '排行',
        url: '/common'
      }],
    };
  }

  render() {
    const { topNavData } = this.state;
    const { location: { pathname }, className } = this.props;
    return (
      <div>
        <Layout className={`${className} layout-main`}>
          <Header className="header">
            <div className="header-logo">LOGO</div>
            <Menu
              mode="horizontal"
              selectedKeys={topNavData.filter((topNav: any) => pathname.indexOf(topNav.url) > -1).map((topNav: any) => topNav.url)}>
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