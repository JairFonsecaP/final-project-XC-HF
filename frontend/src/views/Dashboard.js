import {
    FileOutlined,
    OrderedListOutlined,
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Songs from '../components/Songs';

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
    return {
        key,
        icon,
        children,
        label
    };
};

const items = [
    <Link to='/dashboard/list'>
        {getItem('Songs', '1', <OrderedListOutlined />)}
    </Link>,
    getItem('Albums', '2', <OrderedListOutlined />),
    <div
        onClick={() => {
            props.setToken(null);
        }}
    >
        {getItem('Logout', '3', <LogoutOutlined />)}
    </div>
    // getItem('User', 'sub1', <UserOutlined />, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5')
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [
    //     getItem('Team 1', '6'),
    //     getItem('Team 2', '8')
    // ]),
    // getItem('Files', '9', <FileOutlined />)
];

const Dashboard = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh'
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className='logo' />
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={[
                        getItem('Songs', '1', <OrderedListOutlined />),
                        getItem('Albums', '2', <OrderedListOutlined />),
                        getItem('Logout', '3', <LogoutOutlined />)
                    ]}
                />
            </Sider>
            <Layout className='site-layout'>
                <Header
                    className='site-layout-background'
                    style={{
                        padding: 0
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px'
                    }}
                >
                    <div
                        className='site-layout-background'
                        style={{
                            padding: 24,
                            minHeight: 360
                        }}
                    >
                        <Switch>
                            <Route path='/dashboard/list' exact>
                                <Songs
                                    token={props.token}
                                    setToken={props.setToken}
                                    setUser={props.setUser}
                                    user={props.user}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Hector Fonseca ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
