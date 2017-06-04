'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

export default class GestureLock extends Component {
componentWillMount() {
    console.log('=======render');
}
    render() {
        
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'red'}} >
                <Text style={styles.buttonText} >删除账号</Text>
            </View>
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