// import GestureLock from './components/gestureLock';
// export default GestureLock;
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
componentWillMount() {
}
    render() {
        console.log('Actions.dismiss')
        return (
            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'red'}} 
            onPress={()=>{
                
                Actions.pop()}} />
                
        )
    }
}
