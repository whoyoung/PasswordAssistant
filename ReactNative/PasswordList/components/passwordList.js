'use strict';

import React from 'react';

import {
    Platform,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

import realm from '../../Realm/realm';
import { ListView } from 'realm/react-native';

export default class passwordList extends React.Component {
    constructor(props) {
        super(props);
        this.showView = null;
    }
    componentWillMount() {
        this.typeKeys = realm.objects('TypeKeys');
        this.passwordList = realm.objects('PasswordItems');
        this.lastedPrimaryKey = realm.objects('LastedPrimaryKey');
        this.passwordTypes = realm.objects('PasswordTypes');
        if (!this.typeKeys.length) {
            //网站、银行、社交账号、联系人、证件、记事本
            let keysStr = JSON.stringify([0, 1, 2, 3, 4, 5]);
            realm.write(() => {
                realm.create('TypeKeys', { id: 0, typeList: keysStr });
            });
        }
        if (!this.lastedPrimaryKey.length) {
            realm.write(() => {
                realm.create('LastedPrimaryKey', { id: 0, lastedId: -1 });
            })
        }
        if (!this.passwordTypes.length) {
            realm.write(() => {
                let zeroTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'userName',
                        'loginAccount', 'loginPassword', 'mobilePhone', 'description',
                        'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 0, typeKey: 0, typeFiels: zeroTypeStr
                });

                let firstTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'bankCardNum', 'withdrawalPassword',
                        'MobileBankLoginPassword', 'MobileBankPaymentPassword', 'mobilePhone',
                        'EBankLoginPassword', 'EBankPaymentPassword', 'bankReservedInfo',
                        'queryPassword', 'UShieldBootPassword', 'UShieldPaymentPassword',
                        'bankSubsidiaryCity', 'bankBranch', 'description', 'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 1, typeKey: 1, typeFiels: firstTypeStr
                });

                let secondTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'userName', 'loginAccount',
                        'loginPassword', 'mobilePhone', 'MobileBankPaymentPassword', 'description', 
                        'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 2, typeKey: 2, typeFiels: secondTypeStr
                });

                let thirdTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'mobilePhone', 'telephone',
                        'company', 'post', 'mail', 'lunarCalendarBirthday', 'solarCalendarBirthday', 
                        'detailAddress', 'zipCode', 'description', 'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 3, typeKey: 3, typeFiels: thirdTypeStr
                });

                let fourthTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'credentialsOwner',
                        'credentialsNum', 'credentialsPassword', 'credentialsAddress',
                        'credentialsDate', 'description', 'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 4, typeKey: 4, typeFiels: fourthTypeStr
                });
                let fifthTypeStr = JSON.stringify(
                    [
                        'passwordType', 'typeName', 'serverProvider', 'description', 'creationDate'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 5, typeKey: 5, typeFiels: fifthTypeStr
                });
            })
        }
        if (!this.passwordList.length) {
            //this._addWebsite('website', 'this is a website', 'yanghu');
        }
        
        this.typeKeys.addListener((keys, changes) => {
            console.log('====================================loadTypeKeys');
            console.log(JSON.stringify(keys));
            console.log(JSON.stringify(changes));
            console.log('====================================');
            this.props.actions.loadTypeKeys();
        });
        this.lastedPrimaryKey.addListener((keys, changes) => {
            console.log('====================================loadLastedPrimaryKey');
            console.log(JSON.stringify(keys));
            console.log(JSON.stringify(changes));
            console.log('====================================');
            this.props.actions.loadLastedPrimaryKey();
        });
        this.passwordTypes.addListener((types, changes) => {
            console.log('====================================loadPasswordTypes');
            console.log(JSON.stringify(types));
            console.log(JSON.stringify(changes));
            console.log('====================================');
            this.props.actions.loadPasswordTypes();
        });
        this.passwordList.addListener((passwords, changes) => {
            console.log('====================================loadPasswordItems');
            console.log(JSON.stringify(passwords));
            console.log(JSON.stringify(changes));
            console.log('====================================');
            this.props.actions.loadPasswordItems();
        });
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }
    _getNewPrimaryId() {
        let primaryKey = this.lastedPrimaryKey[0];
        let tempKey = primaryKey.lastedId + 1;
        realm.write(() => {
        realm.create('LastedPrimaryKey', {
                id:primaryKey.id, lastedId: tempKey 
            },true);
        });
        return tempKey;
    }
    _addWebsite(serverProvider, description, userName) {
        let newPrimaryId = this._getNewPrimaryId();
        let server = '' + serverProvider + newPrimaryId;
        realm.write(() => {
            realm.create('PasswordItems', {
                id: newPrimaryId, typeName: '网站', serverProvider: server, passwordType: 0,
                creationDate: new Date(), description: description, userName: userName
            });
        });
    }
    _addNoteBook(serverProvider, description) {
        let newPrimaryId = this._getNewPrimaryId();
        let server = '' + serverProvider + newPrimaryId;
        realm.write(() => {
            realm.create('PasswordItems', {
                id: newPrimaryId, typeName: '记事本', serverProvider: server, passwordType: 5,
                creationDate: new Date(), description: description,
            });
        });
    }
    render() {
        let { loadTypeKeysDone,
            loadLastedPrimaryKeyDone,
            loadPasswordItemsDone,
            loadPasswordTypesDone } = this.props.state;
        let shouldShowList = loadTypeKeysDone && loadLastedPrimaryKeyDone && loadPasswordItemsDone && loadPasswordTypesDone;
        if (!shouldShowList) {
            return (
                <View style={styles.container}>
                    <Text style={styles.initText}>
                        初始化中。。。
                    </Text>
                </View>
            )
        }
        let objects = realm.objects('PasswordItems');
        console.log('====================================objects');
        console.log(JSON.stringify(objects));
        console.log('====================================');
        if (objects.length) {
            this.showView = (<Text style={styles.initText} onPress={() => {
                this._addWebsite('realm', '这是realm', 'whoyoung');
            }}>
                {`${objects[objects.length - 1].serverProvider}`}
            </Text>);
        } else {
            this.showView = <Text style={styles.initText}>empty</Text>
        }

        return (
            <View style={styles.container}>
                <Text style={styles.initText} onPress={() => {
                    this._addWebsite('website', '这是网站', 'whoyoung');
                }} >
                    新建网站账号
                </Text>
                <Text style={styles.initText} onPress={() => {
                    this._addNoteBook('noteBook', '这是记事本', 'yagnhu');
                }} >
                    新建备忘录
                </Text>
                {this.showView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        padding: 15
    },
    initText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center'
    }
})

