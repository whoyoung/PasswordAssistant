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
let { height } = Dimensions.get('window');

const loginModules = {
    login: 'login',
    register: 'register'
}

export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    _changeModule(loginModule) {
        if (loginModule == loginModules.login) {
            this.props.actions.changeModule(loginModules.register);
        } else {
            this.props.actions.changeModule(loginModules.login);
        }
    }
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
                    <TextInput placeholder={userNamePlaceholder} style={styles.input} clearButtonMode='while-editing' />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.textView, { marginTop: 10 }]} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/password.png')} />
                    <TextInput placeholder={passwordPlaceholder} style={styles.input} clearButtonMode='while-editing'
                        secureTextEntry={true} />
                </TouchableOpacity>
                <View style={styles.btnsView} >
                    <TouchableOpacity style={styles.button} opacity={0.5} onPress={() => { }} >
                        <Text style={styles.buttonText} >{loginModule == loginModules.login ? '登录' : '注册'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerBtn} opacity={0.5} onPress={() => {this._changeModule(loginModule)}} >
                        <Text style={styles.buttonText} >{loginModule == loginModules.login ? '注册' : '登录'}</Text>
                    </TouchableOpacity>
                </View>
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