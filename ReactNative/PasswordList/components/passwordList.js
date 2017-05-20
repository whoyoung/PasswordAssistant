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
            storage.load({
                key: 'maxPrimaryKey',
                autoSync: false,
            }).then(result => {

            }).catch(err => {
                console.log('====================================');
                console.log(err.name);
                console.log('====================================');

                // switch (err.name) {
                //     case 'NotFoundError': {
                //         storage.save({
                //             key: 'maxPrimaryKey',
                //             data: {
                //                 maxNum: 0,
                //             },
                //             expires: null
                //         })
                //         realm.write(() => {
                //             realm.create('PasswordItems', {
                //                 id: 0, typeName: '网站', serverProvider: 'react native', passwordType: 0,
                //                 creationDate: new Date(), description: '这是备注', userName: 'yanghu'
                //             });
                //         });
                //     }
                //         break;
                //     case 'ExpiredError':
                //         // TODO
                //         break
                // }
            })
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
                {
                    objects.length ? (
                        <Text style={styles.text}>
                            {`${objects[0].typeName}`}
                        </Text>
                    ) : (
                            <Text style={styles.emptyText}>
                                empty
                            </Text>
                        )
                }
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

