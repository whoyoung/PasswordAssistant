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
import { Actions } from 'react-native-router-flux';

export default class SettingGesturePassword extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.actions.initStatus(this.props.gesturePassword);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.state && nextProps.state.step && nextProps.state.step == ConstDict.passwordStep.settingSuccess) {
            if (this.props.refreshSetting) {
                this.props.refreshSetting();
            }
            Actions.pop();
            return false;
        }
        return true;
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
    render() {
        let { status, messages, step } = this.props.state;
        return (
            <View style={styles.containerView} >
                <PasswordGesture
                    ref='pg'
                    status={status}
                    message={messages[step]}
                    onStart={() => { }}
                    onEnd={(password) => this.onEnd(password, step)}
                    interval={600}
                    textStyle={styles.titleText}
                />
                <Toast ref="toast" position='center' />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    titleText: {
        fontSize: 18,
    }
});