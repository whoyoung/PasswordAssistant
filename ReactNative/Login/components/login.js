'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
                    <TextInput placeholder='用户名' style={styles.input} clearButtonMode='while-editing' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.textView,{marginTop: 10}]} onPress={
                    () => { Actions.entrance() }
                } >
                    <Image resizeMode='contain' style={styles.imageSize}
                        source={require('../../Common/images/password.png')} />
                    <TextInput placeholder='密码' style={styles.input} clearButtonMode='while-editing' 
                    secureTextEntry={true} />
                </TouchableOpacity>
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
        marginTop: 100,
        marginHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5
    },
    imageSize: {
        width: 20,
        height: 21.5,
        marginLeft: 5
    }
})