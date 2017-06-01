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
import ListHeader from './listHeader'
import ListRow from './listRow'

export default class passwordList extends React.Component {
    constructor(props) {
        super(props);
        this.showView = null;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
    }
    componentWillMount() {
        this.typeKeys = realm.objects('TypeKeys');
        this.passwordList = realm.objects('PasswordItems');
        this.lastedPrimaryKey = realm.objects('LastedPrimaryKey');
        this.passwordTypes = realm.objects('PasswordTypes');
        if (!this.typeKeys.length) {
            //网站、银行、社交账号、联系人、证件、记事本
            let keysStr = JSON.stringify([{key:0,value:'website'}, {key:1,value:'bank'}, 
                {key:2,value:'social'}, {key:3,value:'contact'}, {key:4,value:'credentials'}, 
                {key:5,value:'notebook'}]);
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
                        'serverProvider', 'userName', 'loginAccount', 
                        'loginPassword', 'mobilePhone', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 0, typeKey: 0, typeFiels: zeroTypeStr
                });

                let firstTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'bankCardNum', 'withdrawalPassword',
                        'MobileBankLoginPassword', 'MobileBankPaymentPassword', 'mobilePhone',
                        'EBankLoginPassword', 'EBankPaymentPassword', 'bankReservedInfo',
                        'queryPassword', 'UShieldBootPassword', 'UShieldPaymentPassword',
                        'bankSubsidiaryCity', 'bankBranch', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 1, typeKey: 1, typeFiels: firstTypeStr
                });

                let secondTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'userName', 'loginAccount', 'loginPassword', 
                        'mobilePhone', 'MobileBankPaymentPassword', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 2, typeKey: 2, typeFiels: secondTypeStr
                });

                let thirdTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'mobilePhone', 'telephone', 'company', 
                        'post', 'mail', 'lunarCalendarBirthday', 'solarCalendarBirthday',
                        'detailAddress', 'zipCode', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 3, typeKey: 3, typeFiels: thirdTypeStr
                });

                let fourthTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'credentialsOwner',
                        'credentialsNum', 'credentialsPassword', 'credentialsAddress',
                        'credentialsDate', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 4, typeKey: 4, typeFiels: fourthTypeStr
                });
                let fifthTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 5, typeKey: 5, typeFiels: fifthTypeStr
                });
            })
        }
        if (!this.passwordList.length) {
        }

        this.typeKeys.addListener((keys, changes) => {
            this.props.actions.loadTypeKeys();
        });
        this.lastedPrimaryKey.addListener((keys, changes) => {
            this.props.actions.loadLastedPrimaryKey();
        });
        this.passwordTypes.addListener((types, changes) => {
            this.props.actions.loadPasswordTypes();
        });
        this.passwordList.addListener((passwords, changes) => {
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
                id: primaryKey.id, lastedId: tempKey
            }, true);
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
        let typeKeys = this.typeKeys[0];
        let typeArray = JSON.parse(typeKeys.typeList);
        let data = {};
        typeArray.forEach(function (element) {
            let campareStr = 'passwordType = ' + element.key;
            let tempResults = this.passwordList.filtered(campareStr);
            if (tempResults.length) {
                data['' + element.value] = tempResults;
            }
        }, this);
        if (this.passwordList.length) {
            this.showView = (<ListView stype={{ marginTop: 15 }}
                dataSource={this.ds.cloneWithRowsAndSections(data)}
                renderRow={(rowData, sectionId, rowId) => {
                    return <ListRow serverProvider={rowData.serverProvider} />
                }}
                renderSectionHeader={(sectionData, sectionID) => {
                    return <ListHeader sectionID={sectionID} />
                }}
            />);
        } else {
            this.showView = <Text style={styles.initText}>empty</Text>
        }

        return (
            <View style={styles.container}>
                {this.showView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64
    },
    initText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center'
    }
})

