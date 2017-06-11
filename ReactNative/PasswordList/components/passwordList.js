'use strict';
import React from 'react';
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    DeviceEventEmitter,
    TextInput,
    Image
} from 'react-native';

import realm from '../../Realm/realm';
import { ListView } from 'realm/react-native';
import ListHeader from './listHeader'
import ListRow from './listRow'
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-easy-toast'

export default class passwordList extends React.Component {
    constructor(props) {
        super(props);
        this.showView = null;
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.searchDS = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        })
    }
    componentWillMount() {
        this.typeKeys = realm.objects('TypeKeys');
        this.passwordList = realm.objects('PasswordItems');
        this.lastedPrimaryKey = realm.objects('LastedPrimaryKey');
        this.passwordTypes = realm.objects('PasswordTypes');
        if (!this.typeKeys.length) {
            //网站、银行、社交账号、联系人、证件、记事本
            let keysStr = JSON.stringify([{ key: 0, value: 'website' }, { key: 1, value: 'bank' },
            { key: 2, value: 'social' }, { key: 3, value: 'contact' }, { key: 4, value: 'credentials' },
            { key: 5, value: 'notebook' }]);
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
                    id: 0, typeKey: 0, typeFields: zeroTypeStr
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
                    id: 1, typeKey: 1, typeFields: firstTypeStr
                });

                let secondTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'userName', 'loginAccount', 'loginPassword',
                        'mobilePhone', 'MobileBankPaymentPassword', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 2, typeKey: 2, typeFields: secondTypeStr
                });

                let thirdTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'mobilePhone', 'telephone', 'company',
                        'post', 'EMail', 'lunarCalendarBirthday', 'solarCalendarBirthday',
                        'detailAddress', 'zipCode', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 3, typeKey: 3, typeFields: thirdTypeStr
                });

                let fourthTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'credentialsOwner',
                        'credentialsNum', 'credentialsPassword', 'credentialsAddress',
                        'credentialsDate', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 4, typeKey: 4, typeFields: fourthTypeStr
                });
                let fifthTypeStr = JSON.stringify(
                    [
                        'serverProvider', 'description'
                    ]
                )
                realm.create('PasswordTypes', {
                    id: 5, typeKey: 5, typeFields: fifthTypeStr
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

        this.notiEvent = DeviceEventEmitter.addListener('applicationWillEnterForeground', (value) => {
            Actions.gestureUnlock(value);
        })
    }

    componentWillUnmount() {
        realm.removeAllListeners();
        this.notiEvent.remove();
    }
    _startSearch(searchKey, shouldShowList) {
        if (shouldShowList && this.passwordList.length) {
            let campareStr = 'serverProvider CONTAINS[c] "' + searchKey + '"';
            let searchResults = this.passwordList.filtered(campareStr + '').sorted('creationDate', true);
            if (searchResults.length) {
                this.props.actions.searchResults(searchResults);
            } else
                this.refs.toast.show('没有匹配的搜索结果');
        } else {
            this.refs.toast.show('没有匹配的搜索结果');
        }
    }
    _clearSearchResults() {
        this.props.actions.clearSearchResults();
    }
    render() {
        let { loadTypeKeysDone,
            loadLastedPrimaryKeyDone,
            loadPasswordItemsDone,
            loadPasswordTypesDone,
            searchResults } = this.props.state;
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
            let tempResults = this.passwordList.filtered(campareStr).sorted('creationDate', true);
            if (tempResults.length) {
                data['' + element.value] = tempResults;
            }
        }, this);

        if (this.passwordList.length) {
            if (searchResults.length) {
                this.showView = (
                    <ListView stype={{ marginTop: 15 }}
                        dataSource={this.searchDS.cloneWithRows(searchResults)}
                        renderRow={(rowData, sectionId, rowId) => {
                            return <ListRow rowData={rowData} />
                        }}
                    />
                )
            } else {
                this.showView = (
                    <ListView stype={{ marginTop: 15 }}
                        dataSource={this.ds.cloneWithRowsAndSections(data)}
                        renderRow={(rowData, sectionId, rowId) => {
                            return <ListRow rowData={rowData} />
                        }}
                        renderSectionHeader={(sectionData, sectionID) => {
                            return <ListHeader sectionID={sectionID} />
                        }}
                    />
                )
            }
        } else {
            this.showView = <Text style={styles.initText}>暂无账号，请新建账号</Text>
        }

        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Image style={styles.icon} resizeMode='contain' source={require('../../Common/images/searchIcon.png')} />
                    <TextInput style={styles.textInput} autoCapitalize='none'
                        autoCorrect={false} returnKeyType='done' clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically={true} onSubmitEditing={
                            (event) => { this._startSearch(event.nativeEvent.text, shouldShowList); }
                        } color='black' fontSize={16} placeholder='请输入要搜索的账号名称' 
                        onChange={()=>{searchResults.length? this._clearSearchResults() : null}} />
                </View>
                {this.showView}
                <Toast ref="toast" position='center' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        marginBottom: 50,
        backgroundColor: '#efeef4'
    },
    initText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15
    },
    textInput: {
        flex: 1,
        marginLeft: 5
    },
    inputView: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'gray',
        height: 30

    },
    icon: {
        width: 21,
        height: 21
    }
})

