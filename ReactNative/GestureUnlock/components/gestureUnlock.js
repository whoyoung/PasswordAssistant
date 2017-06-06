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
import PasswordGesture from 'react-native-gesture-password';
import YHNativePassword from '../../../Native/NativePassword';

export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'normal',
            message: '请输入您的解锁密码'
        };
    }
    componentWillMount() {
        let {password} = this.props;
        if (password == '0') {
            Actions.pop();
        } else {
            this.setState({
                gesturePassword: password
            })
        }
    }
    onEnd(password) {
        if (password == this.state.gesturePassword) {
            Actions.pop();
        } else {
            this.setState({
                status: 'wrong',
                message: '解锁密码错误，请重新输入'
            });
        }
    }
    onStart() {
    }
    
    render() {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                textStyle={{fontSize: 18}}
                interval={600}
            />
        )
    }
}
