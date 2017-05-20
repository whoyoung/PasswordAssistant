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
        if (!this.passwordList.length) {
            realm.write(() => {
                realm.create('PasswordItems', {
                    id:0,typeName: '网站',serverProvider: 'react native',passwordType:0,
                    creationDate: new Date(), description: '这是备注', userName: 'yanghu'
                });
            });
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
        if (objects.length) {
            console.log('====================================');
        console.log(JSON.stringify(objects[0]));
        console.log('====================================');
        }
        
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

