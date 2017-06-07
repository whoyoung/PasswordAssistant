'use strict'
import React, { Component } from 'react';
import ReactNative, {
    Modal,
    InteractionManager
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';

export default class GestureUnlockModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'normal',
            message: '请输入您的解锁密码',
            modalVisible: true
        };
    }
    componentWillMount() {
        let { password } = this.props;
        this.setState({
            gesturePassword: password
        })
    }
    onEnd(password) {
        if (password == this.state.gesturePassword) {
            this.setState({
                modalVisible: false
            });
            if (this.props.unlockSuccess) {
                InteractionManager.runAfterInteractions(() => {
                    this.props.unlockSuccess();
                });

            }
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
            <Modal animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { }}
            >
                <PasswordGesture
                    ref='pg'
                    status={this.state.status}
                    message={this.state.message}
                    onStart={() => this.onStart()}
                    onEnd={(password) => this.onEnd(password)}
                    textStyle={{ fontSize: 18 }}
                    interval={600}
                />
            </Modal>
        )
    }
}
