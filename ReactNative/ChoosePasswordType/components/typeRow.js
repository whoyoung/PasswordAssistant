'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import fieldsName from '../../CreatePassword/containers/fieldsName'

export default class TypeRow extends Component {
    
    render() {
        let { item, formType, changeRow } = this.props;
        let value;
        if (fieldsName.moduleNameDict[item.value]) {
            value = fieldsName.moduleNameDict[item.value];
        } else {
            value = item.value;
        }
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => changeRow(item.key)} >
                <View style={styles.container} >
                    <Text style={styles.titleText} >{value}</Text>
                    {
                        formType == item.key ?
                            <Image resizeMode={'contain'} style={styles.arrowImage}
                                source={require('../images/list_arrow@3x.png')}
                            /> : null
                    }

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 40,
        alignItems: 'center'
    },
    titleText: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        marginRight: 10
    },
    arrowImage: {
        height: 9,
        width: 13,
    },
});