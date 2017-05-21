'use strict';

import React from 'react';

import {
    Platform,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

import realm from '../../Realm/realm';
import { ListView } from 'realm/react-native';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.showView = null;
    }
    componentWillMount() {
        this.passwordList = realm.objects('PasswordItems');
        if (!this.passwordList.length) {
            this._addWebsite('website', 'this is a website', 'yanghu');
        }

        this.passwordList.addListener((passwords, changes) => {
            this.props.actions.refreshList();
        });
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }
    _addWebsite(serverProvider, description, userName) {
        maxPrimaryKey += 1;
        realm.write(() => {
            realm.create('PasswordItems', {
                id: maxPrimaryKey, typeName: '网站', serverProvider: serverProvider, passwordType: 0,
                creationDate: new Date(), description: description, userName: userName
            });
        });
    }
    render() {
        let { shouldRefreshList } = this.props.state;
        if (shouldRefreshList) {
            this.props.actions.resetRefreshState();
        }
        let objects = realm.objects('PasswordItems');
        if (objects.length) {
            this.showView = (<Text style={styles.text} onPress={() => {
                this._addWebsite('realm', '这是realm', 'whoyoung');
            }}>
                {`${objects[objects.length - 1].serverProvider}`}
            </Text>);
        } else {
            this.showView = <Text style={styles.emptyText}>empty</Text>
        }

        return (
            <View style={styles.container}>
                {this.showView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        padding: 15,
    },
    text: {
        color: 'black',
    },
    emptyText: {
        color: 'black',
        textAlign: 'center',
        alignItems: 'center'
    }
})

