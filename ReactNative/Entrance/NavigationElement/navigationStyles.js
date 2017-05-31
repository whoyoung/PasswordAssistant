import React from 'react';
import {
    StyleSheet,
    Platform
} from 'react-native';

let isIOS = Platform.OS !== 'android';
export default styles = {
    navigationButtonLeft: {
        marginTop:isIOS? 20 : 0,
        marginLeft:10,
        color:'white',
        fontSize:15
    },
    systemNavigatorStyle:{ height:isIOS?64:44, backgroundColor: '#ad9855'},
    systemTitleStyle:{color: 'black' ,marginTop:0},
    systemNavigationButtonLeft:isIOS?{ height: 20, width: 20, marginRight: 5 }:{ height: 20, width: 20, marginRight: 5,bottom:5},
};
