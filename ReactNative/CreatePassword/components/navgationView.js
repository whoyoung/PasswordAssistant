'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import navigationStyles from '../../Entrance/NavigationElement/navigationStyles';
import { Actions } from 'react-native-router-flux';
let isIOS = Platform.OS !== 'android';
export default class CreateFormNavigation extends Component {
    constructor(props) {
        super();
    }

    _chooseModule() {
        let { currentModule, changeFormType } = this.props;
        Actions.choosePasswordType({currentModule:currentModule, changeFormType:changeFormType});
    }

    render() {
        return (
            <View style={[styles.titleView, navigationStyles.systemNavigatorStyle]}>
                <Text style={styles.titleText} onPress={() => { this._chooseModule() }} >
                    模板
                </Text>
                <Text style={styles.titleText} >新建账号</Text>
                <Text style={styles.titleText} onPress={() => { this.props.savePassword()} } >保存</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: isIOS?20:0,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 18,
        color: 'white',
    },
});