'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import SeparatorLine from '../../ChoosePasswordType/components/separatorLine'
import { Actions } from 'react-native-router-flux';

export default class TypeRow extends Component {
    goPasswordDetail() {
        Actions.passwordDetail({ rowData: this.props.rowData });
    }
    render() {
        let { rowData } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.goPasswordDetail()} >
                <View style={styles.textView} >
                    <Text style={styles.titleText} >{rowData.serverProvider}</Text>
                </View>
                <SeparatorLine />
            </TouchableOpacity>
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