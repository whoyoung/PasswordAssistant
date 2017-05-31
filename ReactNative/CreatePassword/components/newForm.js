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
import CreateNavBar from './navgationView';
import tForm from 'tcomb-form-native';
let RealForm = tForm.form.Form;
let screenHeight = Dimensions.get('window').height;
import realm from '../../Realm/realm';

let isIOS = Platform.OS !== 'android';

export default class CreateNewForm extends Component {
    constructor(props) {
        super();
        //多textInput,键盘遮挡解决方案http://www.voidcn.com/blog/hsbirenjie/article/p-6402538.html
        this.contentHeight = 0;
        console.inputRef = null;//当前编辑的textInput
        this.moveH = 0;//ScrollView滑动的距离
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，inputRef是否需要滑动
    }
    componentWillMount() {
        this.changeFormType(0);
    }
    componentDidMount() {
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
        if (!console.inputRef) return;
        this.needMove = false;
        this.refs.form.getComponent(console.inputRef).refs.input.measure((ox, oy, w, h, px, py) => {
            console.log('py======' + py);
            let leftHeight = screenHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）
            //输入框距离底部的距离小于键盘的高度，需要滑动,36是一行输入框的高度
            if (leftHeight < e.startCoordinates.height + 36) {
                this.needMove = true;
                // 需要移动的距离
                let moveHeight = e.startCoordinates.height + 36 - leftHeight;
                console.log("this.moveH=" + this.moveH, "this.contentHeight=" + this.contentHeight, "height=" + screenHeight);

                // moveH 异常数据处理
                if (screenHeight > this.contentHeight) {
                    this.moveH = 0;
                } else if (this.moveH + py > this.contentHeight) {
                    this.moveH = this.contentHeight - py;
                    console.log("===error===");
                } else if (this.moveH + (py - isIOS ? 64 : 44) < 0) {
                    this.moveH = 0;
                }
                console.log('moveH===' + this.moveH);
                this.lastMoveH = this.moveH;
                this.scrollViewTo(this.lastMoveH + moveHeight);
            }
        });
    }

    _keyboardDidHide = () => {
        if (this.needMove) {
            this.scrollViewTo(this.lastMoveH);
        }
        console.inputRef = null;
    }

    onChange(value, path) {
        // if (path.indexOf('rememberMe') >= 0)
    }
    onPress() {
        let value = this.refs.form.getValue();
        if (!value || !value.serverProvider) {
            alert('必填项不能为空');
            return;
        }
        console.log('====================================value');
        console.log(value);
        console.log('====================================');
    }
    clearForm() {
        // this.setState({ ...defaultState });
    }
    changeFormType(formType) {
        if (formType != this.props.state.formType) {
            this.props.actions.changeType(formType);
        }
        
    }
    scrollViewTo(offsetY) {
        this.refs.scroll.scrollTo({ y: offsetY, animated: true });
    }
    render() {
        let { formStruct, formOptions, formType } = this.props.state;
        return (
            <View style={styles.containerView} >
                <CreateNavBar onPress={this.onPress.bind(this)} currentModule={formType} changeFormType={this.changeFormType.bind(this)} />
                <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'
                    ref='scroll' iosalwaysBounceVertical={false} iosbounces={false}
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
            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        paddingBottom: 40,
        backgroundColor: '#F5FCFF',
    },
    container: {
        padding: 15,
        backgroundColor: '#F5FCFF'
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