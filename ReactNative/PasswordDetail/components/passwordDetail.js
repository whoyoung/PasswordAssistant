'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'
import DetailRow from './detailRow';
import DetailNavigationView from './detailNavigationView';
import { Actions } from 'react-native-router-flux';
import realm from '../../Realm/realm';

export default class PasswordDetail extends Component {
    componentWillMount() {
        this.passwordType = this.props.rowData['passwordType'];
        this.passwordTypes = realm.objects('PasswordTypes');
        let campareStr = 'typeKey = ' + this.passwordType;
        let passwordType = this.passwordTypes.filtered(campareStr);
        this.fieldsArray = JSON.parse(passwordType[0].typeFields);
    }

    editPassword() {
        Actions.editPassword({ rowData: this.props.rowData, refreshDetail: this.refreshDetail.bind(this) });
    }
    refreshDetail() {
        this.forceUpdate();
    }
    render() {
        let { rowData } = this.props;
        let keyValueArray = [];
        let navTitle = '账号详情';
        this.fieldsArray.forEach(function (element) {
            let rowValue = rowData[element];
            
            if (!rowValue || rowValue == [] || rowValue == {}) {
            } else {
                if (element == 'serverProvider') {
                    navTitle = rowValue;
                }
                let dict = { key: element, value: rowValue };
                keyValueArray.push(dict);
            }
        }, this);
        let rowViews = [];
        keyValueArray.forEach(function (element) {
            rowViews.push(<DetailRow rowDict={element} passwordType={this.passwordType} />);
        }, this);
        return (
            <View >
                <DetailNavigationView navTitle={navTitle}
                    editPassword={this.editPassword.bind(this)} />
                {rowViews}
                <TouchableOpacity style={styles.button} opacity={0.5} onPress={() => { alert('delete') }} >
                    <Text style={styles.buttonText} >删除账号</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    button: {
        height: 36,
        backgroundColor: 'purple',
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 15,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});