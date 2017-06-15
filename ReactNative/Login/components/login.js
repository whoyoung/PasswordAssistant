'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    TextInput,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-easy-toast';
import * as loginCommon from '../../Common/loginModule';
let { height } = Dimensions.get('window');

export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    _changeModule(loginModule) {
        if (loginModule == loginCommon.loginModules.login) {
            this.props.actions.changeModule(loginCommon.loginModules.register);
        } else {
            this.props.actions.changeModule(loginCommon.loginModules.login);
        }

    }
    _submit(loginModule) {
        let userName = this.refs.userName._lastNativeText;
        let password = this.refs.password._lastNativeText;
        if (!userName) {
            this.refs.toast.show('请输入账号');
            return;
        } else {
            let reg = /^[a-zA-Z0-9_@.]{6,28}$/;
            if (!reg.test(userName)) {
                this.refs.toast.show('账号为"字母 数字 @ . _"的组合, 6-18位');
                return;
            }

        }
        if (!password) {
            this.refs.toast.show('请输入密码');
            return;
        } else {
            let reg = /^[a-zA-Z0-9_@.,]{6,18}$/;
            if (!reg.test(password)) {
                this.refs.toast.show('密码为"字母 数字 @ . _ ,"的组合, 6-18位');
                return;
            }
        }
        this.props.actions.submitInput(loginModule, userName, password);
    }
    // value='huyang@mail.bistu.edu.cn'
    render() {
        let { loginModule } = this.props.state;
        let { userNamePlaceholder, passwordPlaceholder } = this.props.state[loginModule];
        return (
            <View style={styles.containerView} >
                <TouchableOpacity style={styles.textView} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/account.png')} />
                    <TextInput  ref='userName' placeholder={userNamePlaceholder} style={styles.input} clearButtonMode='while-editing' />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.textView, { marginTop: 10 }]} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/password.png')} />
                    <TextInput value='realm4yh' ref='password' placeholder={passwordPlaceholder} style={styles.input} clearButtonMode='while-editing'
                        secureTextEntry={true} />
                </TouchableOpacity>
                <View style={styles.btnsView} >
                    <TouchableOpacity style={styles.button} opacity={0.5} onPress={() => { this._submit(loginModule) }} >
                        <Text style={styles.buttonText} >{loginModule == loginCommon.loginModules.login ? '登录' : '注册'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerBtn} opacity={0.5} onPress={() => { this._changeModule(loginModule) }} >
                        <Text style={styles.buttonText} >{loginModule == loginCommon.loginModules.login ? '注册' : '登录'}</Text>
                    </TouchableOpacity>
                </View>

                <Toast ref="toast" position='center' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#87cefa'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        marginLeft: 5,
    },
    textView: {
        flexDirection: 'row',
        height: 35,
        marginTop: height / 2.0 - 145,
        marginHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    button: {
        flex: 1,
        height: 35,
        backgroundColor: 'purple',
        borderRadius: 5,
        marginLeft: 60,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    },
    imageSize: {
        width: 20,
        height: 21.5,
        marginLeft: 5
    },
    registerBtn: {
        flexDirection: 'row',
        marginRight: 0,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnsView: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 10,
        height: 35,
        alignItems: 'center',
    }
})