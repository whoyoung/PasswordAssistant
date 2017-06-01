'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'

export default class TypeRow extends Component {
    render() {
        let { rowData } = this.props;
        
        return (
                <View style={styles.container} >
                    <Text style={styles.titleText} >{rowData.serverProvider}</Text>
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