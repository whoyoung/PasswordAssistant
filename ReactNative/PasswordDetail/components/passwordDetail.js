'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'
import DetailRow from './detailRow';
import DetailNavigationView from './detailNavigationView';
import { Actions } from 'react-native-router-flux';

export default class PasswordDetail extends Component {

    editPassword() {
        alert('llll');
    }

    render() {
        let { rowData } = this.props;
        let keyValueArray = [];
        let passwordType;
        let navTitle = '账号详情';
        for (var key in rowData) {
            if (key == 'id' || key == 'creationDate') {
                continue;
            }
            if (key == 'passwordType') {
                passwordType = rowData[key];
                continue;
            }
            if (rowData.hasOwnProperty(key)) {
                var element = rowData[key];
                if (!element || !element.length) continue;
                if (key == 'serverProvider') {
                    navTitle = element;
                }
                let dict = { key: key, value: element };
                keyValueArray.push(dict);
            }
        }
        let rowViews = [];
        keyValueArray.forEach(function (element) {
            rowViews.push(<DetailRow rowDict={element} passwordType={passwordType} />);
        }, this);
        return (
            <View >
                <DetailNavigationView navTitle={navTitle}
                    editPassword={this.editPassword.bind(this)} />
                {rowViews}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        color: 'black',
    }
});