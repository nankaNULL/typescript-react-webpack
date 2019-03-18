import React from 'react';
import { connect } from 'react-redux';
import * as action from "@/store/action";
import { withRouter } from 'react-router';
import { bindActionCreators } from "redux";
import { Layout, Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../mainLayout';
import './style.scss';
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
  (state) => state.global,
  (dispatch) => bindActionCreators({ ...action }, dispatch)
)
export default class CommonLayout extends React.PureComponent{
  state = {
    siderBarData: [{
      title: '图书排行1',
      url: '/common/bookRank1',
      icon: 'pie-chart'
    },{
      title: '图书排行2',
      url: '/common/bookRank2',
      icon: 'desktop'
    },{
      title: '图书排行3',
      url: '/common/bookRank3',
      icon: 'file'
    }],
    collapsed: false
  };

  componentDidMount() { 
    console.log(this.props);
    
  }

  toggleCollapsed = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    const { siderBarData } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <MainLayout className="layout-common" {...this.props}>
        <Sider 
          className="sider"
          // collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggleCollapsed}
          >
          <Button className="sider-collapse-btn" onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Menu
            theme="dark" 
            selectedKeys={siderBarData.filter((siderBar) => pathname.indexOf(siderBar.url)>-1).map((siderBar) => siderBar.url)}>
            {siderBarData.map((item) => (
              <Menu.Item key={item.url}>
                <Icon type={item.icon} />
                <span><Link to={item.url} style={{color: '#fff'}}>{item.title}</Link></span>
              </Menu.Item>
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