'use strict'
import React, { Component } from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Keyboard,
    Dimensions,
    Platform
} from 'react-native';
import tForm from 'tcomb-form-native';
let RealForm = tForm.form.Form;
// RealForm.i18n.optional = ' (选填)';
// RealForm.i18n.required = ' (必填)';
let screenHeight = Dimensions.get('window').height - 64;
import realm from '../../Realm/realm';
let typeKeys = realm.objects('TypeKeys');
let lastedPrimaryKey = realm.objects('LastedPrimaryKey');
let isIOS = Platform.OS !== 'android';

export default class TcombFormNativeDemo extends Component {
    constructor(props) {
        super();
        // this.state = {
        //     value: {},
        //     type: this.getFormType(),
        //     options: {
        //         fields: {
        //             birthday: {
        //                 config: {
        //                     animationConfig: {
        //                         duration: 500
        //                     },
        //                     format: (date) => {
        //                         return date.toLocaleString()
        //                     }
        //                 },

        //             },
        //             name: {
        //                 label: '姓名'
        //             }
        //         }
        //     }
        // };

        // this.options = {
        //     fields: {
        //         serverProvider: {
        //             label: 'serverProvider',
        //             onFocus: () => {
        //                 this.inputRef = 'serverProvider';
        //                 console.log('inputref------' + this.inputRef);
        //             }
        //         },
        //         description: {
        //             label: 'description',
        //             onFocus: () => {
        //                 this.inputRef = 'description';
        //                 console.log('description------' + this.inputRef);
        //             }
        //         }
        //     }
        // }

        //多textInput,键盘遮挡解决方案http://www.voidcn.com/blog/hsbirenjie/article/p-6402538.html
        this.contentHeight = 0;
        this.inputRef = null;//当前编辑的textInput
        this.moveH = 0;//ScrollView滑动的距离
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，inputRef是否需要滑动
    }

    componentWillMount() {
        this.props.actions.changeType(1);
    }
    componentDidMount() {
        // this.refs.form.getComponent('age').refs.input.focus();
        if (isIOS) {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
            ];
        }
    }
    componentWillUnmount() {
        if (isIOS) {
            this.subscriptions.forEach((sub) => sub.remove());
        }
    }
    _keyboardDidShow = (e) => {
        console.log('inputRef======'+this.inputRef);
        if (!this.props.state.inputRef) return;
        this.needMove = false;
        this.refs.form.getComponent(this.props.state.inputRef).refs.input.measure((ox, oy, w, h, px, py) => {
            let leftHeight = screenHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）
            //输入框距离底部的距离小于键盘的高度，需要滑动
            if (leftHeight < e.startCoordinates.height + 25) {
                this.needMove = true;
                // 需要移动的距离
                let moveHeight = 30 + (e.startCoordinates.height - leftHeight);
                console.log("this.moveH=" + this.moveH, "this.contentHeight=" + this.contentHeight, "height=" + screenHeight);

                //moveH 异常数据处理
                if (this.moveH + screenHeight > this.contentHeight) {
                    this.moveH = this.contentHeight - screenHeight;
                    console.log("===error===");
                }
                this.lastMoveH = this.moveH;
                this.refs.scroll.scrollTo({ y: this.moveH + moveHeight, x: 0 });
            }
        });
    }

    _keyboardDidHide = () => {
        if (this.needMove) {
            this.refs.scroll.scrollTo({ y: this.lastMoveH, x: 0 });
        }
        this.inputRef = null;
    }
    // onChange(value, path) {
    // if (path.indexOf('rememberMe') >= 0) {
    //   let options = tForm.update(this.state.options, {
    //     fields: {
    //       name: {
    //         editable: { '$set': !value.rememberMe }
    //       }
    //     }
    //   })
    //   this.setState({ options: options, value: value });
    // } else {
    //   this.setState({ value: value });
    // }
    // }
    onChange(value, path) {
        console.log('====================================value');
        console.log(JSON.stringify(value));
        console.log('====================================');
        // if (path.indexOf('name') >= 0 && value.name !== this.state.value.name) {
        //     let formType = this.getFormType(value.name);
        //     this.setState({ value, type: formType });
        // } else {
        //     this.setState({ value });
        // }
    }
    onPress() {
        let value = this.refs.form.getValue();
        if (value) {
            console.log(value);
            this.clearForm();
        }
    }
    clearForm() {
        // this.setState({ ...defaultState });
    }

    scrollViewTo(offsetY) {
        this.refs.scroll.scrollTo({ y: offsetY, animated: true });
    }
    render() {
        let { formStruct, formOptions } = this.props.state;
        console.log('====================================formOptions');
        console.log(JSON.stringify(formOptions));
        console.log('====================================');
        return (
            <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'
                ref='scroll'
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.contentHeight = parseInt(contentHeight);
                }}
                onScrollEndDrag={(e) => {
                    this.moveH = e.nativeEvent.contentOffset.y;
                }} >
                <RealForm ref='form' type={tForm.struct(formStruct)} onChange={(value, path) => this.onChange(value, path)}
                    options={formOptions} />
                <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

// options={this.state.options} value={this.state.value}
const styles = StyleSheet.create({
    container: {
        paddingTop: 64 + 15,
        paddingHorizontal: 15,
        paddingBottom: 40,
        backgroundColor: '#F5FCFF',
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});