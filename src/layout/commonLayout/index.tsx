import React from 'react';
import { connect } from 'react-redux';
import { bookActions } from './models';
import { bindActionCreators } from 'redux';
import { Layout, Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout, { MainLayoutProps } from '../mainLayout';
import './style.scss';
const { Sider, Content } = Layout;

interface CommonLayoutProps extends MainLayoutProps {
    menuList: any[];
    bookList: any[];
    getBookMenuList: (params: any) => void;
    getApiList: (params?: any) => void;
    location: {
        pathname: string,
    };
}
interface CommonLayoutState {
    collapsed: boolean;
}

@(connect(
    (state: any) => ({
        ...state.book
    }),
    dispatch => bindActionCreators({ ...bookActions }, dispatch)
) as any)
export default class CommonLayout extends React.PureComponent<CommonLayoutProps, CommonLayoutState> {
    state: CommonLayoutState = {
        collapsed: false
    }

    componentDidMount() {
        this.getBookMenuList();
        this.props.getApiList();
        // API.getTheData({}).then((res: any) => {
        //   console.log(res);
        // });
        // API.getErrData({}).then(res => {
        //   console.log(res)
        // })
    }

    getBookMenuList() {
        const { getBookMenuList } = this.props;
        const menuList = [{
            title: '图书排行1',
            url: '/common/bookRank1',
            icon: 'pie-chart'
        }, {
            title: '图书排行2',
            url: '/common/bookRank2',
            icon: 'desktop'
        }, {
            title: '图书排行3',
            url: '/common/bookRank3',
            icon: 'file'
        }]
        getBookMenuList(menuList);
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        const { location: { pathname }, menuList } = this.props;
        return (
            <MainLayout className="layout-common" {...this.props}>
                <Sider
                    className="sider"
                    collapsed={this.state.collapsed}
                    onCollapse={this.toggleCollapsed}
                >
                    <Button className="sider-collapse-btn" onClick={this.toggleCollapsed}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                    <Menu
                        theme="dark"
                        selectedKeys={menuList.filter((siderBar: any) => pathname.indexOf(siderBar.url) > -1).map((siderBar: any) => siderBar.url)}>
                        {menuList.map((item: any) => (
                            <Menu.Item key={item.url}>
                                <Icon type={item.icon} />
                                <span><Link to={item.url} style={{ color: '#fff' }}>{item.title}</Link></span>
                            </Menu.Item>)
                        )}
                    </Menu>
                </Sider>
                <Content>
                    {this.props.children}
                </Content>
            </MainLayout>
        )
    }
}
