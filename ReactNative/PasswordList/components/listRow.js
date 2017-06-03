'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import SeparatorLine from '../../ChoosePasswordType/components/separatorLine'
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';

export default class ListRow extends Component {
    goPasswordDetail() {
        Actions.passwordDetail({ rowData: this.props.rowData });
    }

    render() {
        let { rowData } = this.props;
        var swipeoutBtns = [
            {
                text: '删除',
                backgroundColor: 'purple',
                color: 'black',
                onPress: () => { alert('delete') },
                underlayColor: 'gray'
            },
            {
                text: '编辑',
                backgroundColor: 'green',
                color: 'black',
                onPress: () => { alert('edit') },
                underlayColor: 'gray'
            }
        ]
        return (
            <Swipeout right={swipeoutBtns} backgroundColor='white' autoClose={true} buttonWidth={60} >
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.goPasswordDetail()} >
                    <View style={styles.textView} >
                        <Text style={styles.titleText} numberOfLines={1} >{rowData.serverProvider}</Text>
                    </View>
                    <SeparatorLine style={{ marginHorizontal: 15 }} />
                </TouchableOpacity>
            </Swipeout >

        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    textView: {
        height: 39.5,
        paddingHorizontal: 15,
        justifyContent: 'center'
    }
});