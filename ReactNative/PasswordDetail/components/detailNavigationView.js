'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import navigationStyles from '../../Entrance/NavigationElement/navigationStyles';
import { Actions } from 'react-native-router-flux';
let isIOS = Platform.OS !== 'android';

export default class DetailNavigationView extends Component {
    render() {
        return (
            <View style={[styles.titleView, navigationStyles.systemNavigatorStyle]}>
                <TouchableOpacity style={styles.backView} onPress={() => { Actions.pop() }} >
                    <Image resizeMode={'contain'} style={styles.arrowImage}
                        source={require('../../Entrance/NavigationElement/images/nav_bar_back.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.titleText} >{this.props.navTitle}</Text>
                <TouchableOpacity style={styles.editView} onPress={() => { this.props.editPassword() }} >
                    <Text style={[styles.titleText,{textAlign:'right'}]}  >编辑</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: isIOS ? 20 : 0,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    backView: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowImage: {
        width: 22,
        height: 22
    },
    editView: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    }
});