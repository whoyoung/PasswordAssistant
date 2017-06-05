import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class Setting extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.initState();
    }

    componentDidMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }
    _switchStatusChange(newValue) {
        this.props.actions.gestureSwitchChange(newValue);
    }
    _settingGesturePassword() {
        Actions.settingGesturePassword();
    }
    render() {
        let { gestureSwitchOn, gesturePassword } = this.props.state;
        return (
            <View style={styles.container}>
                <View style={styles.textAndSwitch} >
                    <Text numberOfLines={1} style={styles.text} >手势密码</Text>
                    <Switch onValueChange={(newValue) => { this._switchStatusChange(newValue) }}
                        value={gestureSwitchOn} />
                </View>
                <TouchableOpacity style={styles.textAndSwitch} onPress={() => { this._settingGesturePassword() }} activeOpacity={0.8} >
                    <Text numberOfLines={1} style={styles.text} >设置手势密码</Text>
                    <Image resizeMode={'contain'} style={styles.rightArrow} 
                    source={require('../../Common/images/rightArrow.png') } />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        backgroundColor: '#efeef4',
        paddingVertical: 15
    },
    text: {
        flex: 1,
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        marginRight: 15
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