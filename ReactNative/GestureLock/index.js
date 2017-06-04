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
    console.log('=======render');
}
    render() {
        
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'red'}} >
                
            </View>
        )
    }
}
