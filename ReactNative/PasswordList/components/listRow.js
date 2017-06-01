'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View
} from 'react-native';
import SeparatorLine from '../../ChoosePasswordType/components/separatorLine'

export default class TypeRow extends Component {
    render() {
        let { serverProvider } = this.props;
        return (
            <View>
                <View style={styles.textView} >
                    <Text style={styles.titleText} >{serverProvider}</Text>
                </View>
                <SeparatorLine />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        color: 'black'
    },
    textView: {
        height: 39.5,
        paddingHorizontal: 15,
        justifyContent: 'center'
    }
});