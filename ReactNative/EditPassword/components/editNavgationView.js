'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import navigationStyles from '../../Entrance/NavigationElement/navigationStyles';
import { Actions } from 'react-native-router-flux';
let isIOS = Platform.OS !== 'android';
let {width} = Dimensions.get('window');

export default class CreateFormNavigation extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={[styles.titleView, navigationStyles.systemNavigatorStyle]}>
                <TouchableOpacity style={styles.backView} onPress={() => { Actions.pop() }} >
                    <Image resizeMode={'contain'} style={styles.arrowImage}
                        source={require('../../Entrance/NavigationElement/images/nav_bar_back.png')}
                    />
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.titleText,{maxWidth:width-110} ]} >编辑{this.props.navTitle}</Text>
                <TouchableOpacity style={styles.editView} onPress={() => { this.props.savePassword() }} >
                    <Text style={[styles.titleText]}  >保存</Text>
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
        color: 'white',
        textAlign:'center'
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