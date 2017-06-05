'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PasswordGesture from 'react-native-gesture-password'
export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'normal',
            message: 'Please input your password'
        };
    }
    onEnd(password) {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });
            Actions.pop();
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
    render() {
        console.log(this.state);
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
            />
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