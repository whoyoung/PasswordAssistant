'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    View
} from 'react-native';

export default class SeparatorLine extends Component {
    render() {
        return (
            <View style={[styles.separatorLine,this.props.style]} />
        )
    }
}

const styles = StyleSheet.create({
    separatorLine: {
        height: 0.5,
        backgroundColor: 'gray',
    }
});