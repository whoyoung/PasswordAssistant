import React, { Component, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

import NavigationStyles from '../NavigationElement/navigationStyles';
import TabIcon from './tabIcon';

import PasswordList from '../../PasswordList';
import CreatePassword from '../../CreatePassword';
import Setting from '../../Setting';
import ChoosePasswordType from '../../ChoosePasswordType';
import PasswordDetail from '../../PasswordDetail';
import EditPassword from '../../EditPassword';
import GestureUnlock from '../../GestureUnlock';
import SettingGesturePassword from '../../SettingGesturePassword';
import GestureUnlockModal from '../../GestureUnlockModal';

export default class app extends Component {
    constructor(props) {
        super(props);
        if (this.props.password) {
            this.state = { hasUnlock: false }
        }
    }
    unlockSuccess() {
        this.setState({ hasUnlock: true });
    }
    render() {
        if (this.props.password && !this.state.hasUnlock) {
            return (
                <GestureUnlockModal password={this.props.password}
                    unlockSuccess={this.unlockSuccess.bind(this)} />
            )
        }

        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="yh_tabs" initial={true} tabs={true} tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                        <Scene key="passwordList" initial={true} title="账号列表" component={PasswordList} hideNavBar={false} hideTabBar={false}
                            icon={TabIcon} navigationBarStyle={NavigationStyles.systemNavigatorStyle}
                            titleStyle={NavigationStyles.systemTitleStyle} />
                        <Scene key="createPassword" title="新建账号" component={CreatePassword} hideNavBar={true} hideTabBar={false}
                            icon={TabIcon} />
                        <Scene key="setting" title="设置" component={Setting} hideNavBar={false} hideTabBar={false}
                            icon={TabIcon} navigationBarStyle={NavigationStyles.systemNavigatorStyle}
                            titleStyle={NavigationStyles.systemTitleStyle} />
                    </Scene>
                    <Scene key="choosePasswordType" title="选择账号模板" component={ChoosePasswordType} hideNavBar={true} hideTabBar={true} />
                    <Scene key="passwordDetail" title="账号详情" component={PasswordDetail} hideNavBar={true} hideTabBar={true} />
                    <Scene key="editPassword" title="编辑" component={EditPassword} hideNavBar={true} hideTabBar={true} />
                    <Scene key="gestureUnlock" title="手势解锁" component={GestureUnlock} direction='fade' hideNavBar={true} hideTabBar={true}
                        duration={0} />
                    <Scene key="settingGesturePassword" title="设置手势密码" component={SettingGesturePassword} hideNavBar={false} hideTabBar={true}
                        navigationBarStyle={NavigationStyles.systemNavigatorStyle} titleStyle={NavigationStyles.systemTitleStyle}
                        backButtonImage={require('../NavigationElement/images/nav_bar_back.png')}
                        leftButtonIconStyle={{ width: 20, justifyContent: 'center', marginLeft: 5 }} />
                </RouterWithRedux>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({

    tabBarStyle: {
        backgroundColor: '#999',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});