import {
    FileOutlined,
    OrderedListOutlined,
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Albums from '../components/Albums';
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
    getItem('Albums', '1', <OrderedListOutlined />),
    getItem('Songs', '2', <OrderedListOutlined />),
    getItem('Logout', '3', <LogoutOutlined />)
];
//
//     {getItem('Albums', '1', <OrderedListOutlined />)}
// ,
// getItem('Albums', '2', <OrderedListOutlined />),
// <div
//     onClick={() => {
//         props.setToken(null);
//     }}
// >
//     {getItem('Logout', '3', <LogoutOutlined />)}
// </div>
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

const Dashboard = (props) => {
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(false);

    const clickNavBar = (e) => {
        switch (e.key) {
            case '1': {
                history.push('/dashboard/albums');
                break;
            }
            case '2': {
                history.push('/dashboard/songs');
                break;
            }
            case '3': {
                localStorage.removeItem('token');
                props.setToken(null);
            }
        }
    };

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
                    items={items}
                    onClick={clickNavBar}
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
                            <Route path='/dashboard/albums' exact>
                                <Albums
                                    token={props.token}
                                    setToken={props.setToken}
                                    setUser={props.setUser}
                                    user={props.user}
                                />
                            </Route>
                            <Route path='/dashboard/songs' exact>
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
                    {'Hector Fonseca & Ximena Carrillo ©' +
                        new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
