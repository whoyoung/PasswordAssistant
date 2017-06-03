'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'
import DetailRow from './detailRow'
export default class PasswordDetail extends Component {
    render() {
        let { rowData } = this.props;
        let keyValueArray = [];
        let passwordType;
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
                let dict = { key: key, value: element };
                keyValueArray.push(dict);
            }
        }
        console.log(keyValueArray);
        let rowViews = [];
        keyValueArray.forEach(function(element) {
            rowViews.push(<DetailRow rowDict = {element} passwordType = {passwordType} />);
        }, this);
        return (
                <View style={styles.container} >
                    {rowViews}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    titleText: {
        fontSize: 18,
        color: 'black',
    }
});