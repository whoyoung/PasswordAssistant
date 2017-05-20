import React, { Component, } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
import Storage from 'react-native-storage';

import NavigationStyles from '../NavigationElement/navigationStyles';
import TabIcon from './tabIcon';

import PasswordList from '../../PasswordList';
import CreatePassword from '../../CreatePassword';
import Setting from '../../Setting';

export default class app extends Component {
    constructor(props) {
        super(props);

        const storage = new Storage({
            size: 1000,
            storageBackend: AsyncStorage,
            defaultExpires: null,
            enableCache: true,
            //   sync: require('./sync')  // 这个sync文件是要你自己写的
        });
        global.storage = storage;

        storage.save({
            key: 'passwordTypes',  
            data: {
                '0': ['passwordType', 'typeName', 'serverProvider', 'userName', 'loginAccount',
                    'loginPassword', 'mobilePhone', 'description', 'creationDate'],//website
                
                '1': ['passwordType', 'typeName', 'serverProvider', 'bankCardNum', 'withdrawalPassword',
                    'MobileBankLoginPassword', 'MobileBankPaymentPassword', 'mobilePhone', 
                    'EBankLoginPassword', 'EBankPaymentPassword', 'bankReservedInfo', 
                    'queryPassword', 'UShieldBootPassword', 'UShieldPaymentPassword', 
                    'bankSubsidiaryCity', 'bankBranch', 'description', 'creationDate'],//bank
                '2': ['passwordType', 'typeName', 'serverProvider', 'userName', 'loginAccount',
                    'loginPassword', 'mobilePhone', 'description', 'creationDate'],//mail
                '3': ['passwordType', 'typeName', 'serverProvider', 'mobilePhone', 'telephone',
                    'company', 'post', 'mail', 'detailAddress', 'lunarCalendarBirthday',
                    'solarCalendarBirthday', 'detailAddress', 'contactName', 'zipCode', 
                    'mobilePhone', 'telephone', 'description', 'creationDate'],//contact
                '4': ['passwordType', 'typeName', 'serverProvider', 'detailAddress', 'contactName', 
                    'zipCode', 'mobilePhone', 'telephone', 'description', 'creationDate'],//location
            },
            expires: null
        });

        storage.save({
            key: 'typeKeys',  
            data: [0, 1, 2, 3, 4],
            expires: null
        });
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
                        navigationBarStyle={NavigationStyles.systemNavigatorStyle}
                        titleStyle={NavigationStyles.systemTitleStyle} >
                        <Scene key="passwordList" initial={true} title="账号列表" component={PasswordList} hideNavBar={false} hideTabBar={false}
                            icon={TabIcon} />
                        <Scene key="createPassword" title="新建账号" component={CreatePassword} hideNavBar={false} hideTabBar={false}
                            icon={TabIcon} />
                        <Scene key="setting" title="设置" component={Setting} hideNavBar={false} hideTabBar={false}
                            icon={TabIcon} />
                    </Scene>
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