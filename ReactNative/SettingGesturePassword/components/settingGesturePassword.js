import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class SettingGesturePassword extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text} >
                    back
                </Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        backgroundColor: '#efeef4',
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    textAndSwitch: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        marginTop: 0.5
    },
    rightArrow: {
        marginRight: 0,
        width: 8,
        height: 13
    }
})