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

export default class GestureLock extends Component {
    render() {
        return (
            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'red'}} 
            onPress={()=>{Actions.pop()}} >
                <Text style={styles.buttonText} >删除账号</Text>
            </TouchableOpacity>
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