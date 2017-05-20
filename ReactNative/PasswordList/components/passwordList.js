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


    }
    componentWillMount() {
        this.passwordList = realm.objects('PasswordItems');
        // if (this.passwordList.length < 1) {
        //     realm.write(() => {
        //         realm.create('passwordList', {name: 'Todo List', creationDate: new Date()});
        //     });
        // }
        if (this.passwordList.length) {

        }
        this.passwordList.addListener((passwords, changes) => {
            console.log("changed: " + JSON.stringify(changes));
        });
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }

    render() {
        let objects = realm.objects('PasswordItems');
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {objects.length ? 'length' : 'empty'}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
    },
    text: {
        color: 'black',
        
    }
})

