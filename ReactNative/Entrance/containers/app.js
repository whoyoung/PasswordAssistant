import React, { Component, } from 'react';
import {
    StyleSheet,
    Text,
    View,
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
import GestureLock from '../../GestureLock';

export default class app extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        
    }
    render() {
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
                            icon={TabIcon}  navigationBarStyle={NavigationStyles.systemNavigatorStyle}
                            titleStyle={NavigationStyles.systemTitleStyle} />
                    </Scene>
                    <Scene key="choosePasswordType" title="选择账号模板" component={ChoosePasswordType} hideNavBar={true} hideTabBar={true} />
                    <Scene key="passwordDetail" title="账号详情" component={PasswordDetail} hideNavBar={true} hideTabBar={true} />
                    <Scene key="editPassword" title="编辑" component={EditPassword} hideNavBar={true} hideTabBar={true} />
                    <Scene key="gestureLock" title="手势解锁" component={GestureLock} hideNavBar={true} hideTabBar={true} />
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