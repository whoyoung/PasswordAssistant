import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import ConstDict from '../constDict';
import Toast from 'react-native-easy-toast'

export default class SettingGesturePassword extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.actions.initStatus(this.props.gesturePassword);
    }
    onEnd(password, step) {
        switch (step) {
            case ConstDict.passwordStep.unlock:
            case ConstDict.passwordStep.unlockError: {
                this.props.actions.inputEnd(password, step, this.props.gesturePassword);
            }
            break;
            case ConstDict.passwordStep.settingPassword:
            case ConstDict.passwordStep.lengthError: {
                this.props.actions.inputEnd(password, step, null);
            }
            break;
            case ConstDict.passwordStep.confirmPassword:
            case ConstDict.passwordStep.confirmPasswordError: {
                this.props.actions.inputEnd(password, step, this.props.state.settingPassword);
            }
            break;
            default:
                break;
        }
    }
    onStart() {

    }
    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
    render() {
        let { status, messages, step } = this.props.state;
        return (
            <PasswordGesture
                ref='pg'
                status={status}
                message={messages[step]}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password, step)}
                interval={600}
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