'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'
import SeparatorLine from '../../ChoosePasswordType/components/separatorLine'
export default class DetailRow extends Component {
    render() {
        let { rowDict, passwordType } = this.props;
        let showTitle;
        if (rowDict.key == 'serverProvider') {
            showTitle = fieldsName.fieldsNameDict[rowDict.key + passwordType];
            showTitle = showTitle.substr(0, showTitle.length - 5);
        } else {
            showTitle = fieldsName.fieldsNameDict[rowDict.key];
        }

        let title = showTitle ? showTitle : rowDict.key;
        return (
            <View style={styles.container} >
                <Text style={styles.titleText} >{title}</Text>
                <Text style={styles.contentText} >{rowDict.value}</Text>
                <SeparatorLine />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    titleText: {
        fontSize: 18,
        color: 'gray',
    },
    contentText: {
        marginTop: 5,
        fontSize: 18,
        color: 'black',
    }
});