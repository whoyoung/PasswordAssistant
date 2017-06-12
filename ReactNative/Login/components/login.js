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

export default class GestureUnlock extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.containerView} >
                <TouchableOpacity style={styles.textView} >
                    <Text style={styles.titleText} onPress={
                        ()=>{Actions.entrance()}
                    } >
                        用户名
                    </Text>
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
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    textView: {
        flexDirection: 'row',
        height: 35,
        marginTop: 100,
        marginHorizontal: 15,
        justifyContent: 'center'
    }
})