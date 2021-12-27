import React from 'react';
import { Menu, Layout, Dropdown, Avatar, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { globalActions } from '@/store/globalReducer';
import { Link } from 'react-router-dom';
import './style.scss';
import { API } from '@/api';

const { Header, Footer } = Layout;

interface MainLayoutState {
    topNavData: any;
}

export interface MainLayoutProps {
    className?: string;
    location: any;
    userInfo: any;
    fetchUserInfo: (params?: any) => void;
    history: any;
}
@(connect(
    (state: any) => state.global,
    (dispatch: any) => bindActionCreators({ ...globalActions }, dispatch)
) as any)
export default class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
    constructor(props: MainLayoutProps) {
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
            }]
        };
    }

    componentDidMount() {
        const { userInfo, fetchUserInfo } = this.props;
        !userInfo.username && fetchUserInfo();
    }

    logout = () => {
        API.userLogout().then((res: any) => {
            const { result, result_message } = res;
            if (result) {
                message.success(result_message);
                this.props.history.push('/login')
            } else {
                message.error(result_message);
            }
        })
    }

    render() {
        const { topNavData } = this.state;
        const { location: { pathname }, className, userInfo } = this.props;
        return (
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
                    <div style={{ textAlign: 'right', flex: 1 }}>
                        {!userInfo.username
                            ? <Link to="/login">登录</Link>
                            : <Dropdown
                                overlay={<Menu className="user-info" style={{ width: 150 }}>
                                    <Menu.Item key="1" ><Avatar icon="user" size="small" />&nbsp;{userInfo.username}</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item key="2"><Icon type="user" /><a href="javascript:;" >个人信息</a></Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item key="3"><Icon type="logout" /><a onClick={this.logout}>退出登录</a></Menu.Item>
                                </Menu>}
                            >
                                <a href="javascript:;">
                                    <Avatar icon="user" />
                                    <span style={{ marginLeft: 10 }}>{userInfo.username}</span>
                                </a>
                            </Dropdown>}

                    </div>
                </Header>
                <Layout className="content">
                    {this.props.children}
                </Layout>
                <Footer className="footer">
                    <div>{window.APP_CONF?.FOOTER}</div>
                </Footer>
            </Layout>
        )
    }
}
