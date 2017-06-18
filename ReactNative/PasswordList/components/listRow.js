'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import SeparatorLine from '../../ChoosePasswordType/components/separatorLine'
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import realm from '../../Realm/realm';

export default class ListRow extends Component {
    goPasswordDetail() {
        Actions.passwordDetail({ rowData: this.props.rowData });
    }
    _editPassword(rowData) {
        Actions.editPassword({ rowData: rowData });
    }
    _deletePassword(rowData) {
        Alert.alert(
            '', '确定要删除此账号吗？',
            [
                { text: '取消' },
                {
                    text: '确定', onPress: () => {
                        realm.write(() => {
                            realm.delete(rowData);
                        });
                    }
                }
            ]
        )
    }
    render() {
        let { rowData } = this.props;
        let swipeoutBtns = [
            {
                text: '删除',
                backgroundColor: 'purple',
                color: 'white',
                onPress: () => { this._deletePassword(rowData) },
                underlayColor: 'gray'
            },
            {
                text: '编辑',
                backgroundColor: 'green',
                color: 'white',
                onPress: () => { this._editPassword(rowData) },
                underlayColor: 'gray'
            }
        ];
        return (
            <Swipeout right={swipeoutBtns} backgroundColor='white' autoClose={true} buttonWidth={60} >
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.goPasswordDetail()} >
                    <View style={styles.textView} >
                        <Text style={styles.titleText} numberOfLines={1} >{rowData.serverProvider}</Text>
                    </View>
                    <SeparatorLine style={{ marginHorizontal: 15 }} />
                </TouchableOpacity>
            </Swipeout >

        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    textView: {
        height: 49.5,
        paddingHorizontal: 15,
        justifyContent: 'center'
    }
});