'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import navigationStyles from '../../Entrance/NavigationElement/navigationStyles';
import { Actions } from 'react-native-router-flux';
import TypeRow from './typeRow'
import realm from '../../Realm/realm';
let typeKeys = realm.objects('TypeKeys');
let typeData = [];
export default class ChoosePasswordType extends Component {
    constructor(props) {
        super();
    }

    componentWillMount() {
        this.props.actions.changeType(this.props.currentModule);
        let TypeKey = typeKeys[0];
        typeData = JSON.parse(TypeKey.typeList);
    }
    _changeRow(rowType) {
        if (rowType != this.props.state.formType) {
            this.props.actions.changeType(rowType);
        }
        
    }

    render() {
        let { formType } = this.props.state;
        return (
            <View style={styles.container} >
                <View style={[styles.titleView, navigationStyles.systemNavigatorStyle]}>
                    <Text style={styles.titleText} onPress={() => { Actions.pop() }} >
                        取消
                    </Text>
                    <Text style={styles.titleText} >选择账号模板</Text>
                    <Text style={styles.titleText} onPress={this.props.onPress} >确定</Text>
                </View>

                <FlatList
                    data={typeData}
                    renderItem={({ item }) => {
                        return <TypeRow item={item} formType={formType} changeRow={this._changeRow.bind(this)} />
                    }}
                    ItemSeparatorComponent={() => { return <View style={styles.separatorLine} /> }}
                />
            </View>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    separatorLine: {
        height: 0.5,
        backgroundColor: 'gray',
    }
});