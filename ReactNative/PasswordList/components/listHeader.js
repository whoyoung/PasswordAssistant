'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'

export default class ListHeader extends Component {
    render() {
        let { sectionID } = this.props;
        let value;
        if (fieldsName.moduleNameDict[sectionID]) {
            value = fieldsName.moduleNameDict[sectionID];
        } else {
            value = sectionID;
        }
        return (
                <View style={styles.container} >
                    <Text style={styles.titleText} >{value}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0eff6'
    },
    titleText: {
        flex: 1,
        fontSize: 13,
        color: '#7d7d82',
    }
});