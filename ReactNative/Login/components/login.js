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
export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.containerView} >
                <TouchableOpacity style={styles.textView} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/account.png')} />
                    <TextInput placeholder='"字母 数字 @ . _"的组合, 最少六位' style={styles.input} clearButtonMode='while-editing' />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.textView, { marginTop: 10 }]} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/password.png')} />
                    <TextInput placeholder='"字母 数字"的组合, 最少六位' style={styles.input} clearButtonMode='while-editing'
                        secureTextEntry={true} />
                </TouchableOpacity>
                <View style={styles.btnsView} >
                    <TouchableOpacity style={styles.button} opacity={0.5} onPress={() => { }} >
                        <Text style={styles.buttonText} >登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerBtn} opacity={0.5} onPress={() => { }} >
                        <Text style={styles.buttonText} >注册</Text>
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
        marginTop: height / 2.0 - 165,
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
    },
    btnsView: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 10,
        height: 35,
        alignItems: 'center',
    }
})