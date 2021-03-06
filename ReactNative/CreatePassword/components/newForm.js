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
import * as createActions from '../actions/actions';
import Toast from 'react-native-easy-toast'
let isIOS = Platform.OS !== 'android';
let scrollContainerH = screenHeight - 50 - (isIOS ? 64 : 44);

export default class CreateNewForm extends Component {
    constructor(props) {
        super();
        //多textInput,键盘遮挡解决方案http://www.voidcn.com/blog/hsbirenjie/article/p-6402538.html
        this.contentHeight = 0;
        console.inputRef = null;//当前编辑的textInput
        this.moveH = 0;//ScrollView滑动的距离
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
        if (!this.refs.form || !this.refs.form.getComponent(console.inputRef)) return;
        this.refs.form.getComponent(console.inputRef).refs.input.measure((ox, oy, w, h, px, py) => {
            let leftHeight = screenHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）
            //输入框距离底部的距离小于键盘的高度，需要滑动,36是默认一行输入框的高度
            let rowHeight = this._rowHeight(console.inputRef);
            if (leftHeight < e.startCoordinates.height + rowHeight) {
                this.needMove = true;
                let moveHeight = e.startCoordinates.height + rowHeight - leftHeight;
                this.scrollViewTo(this.moveH+moveHeight);
            }
        });
    }
    _rowHeight(inputRef) {
        if (inputRef == 'description') {
            if (this.props.state.formType == 5) {//记事本
                return 200;
            }
            return 65;
        }
        return 36;
    }
    _keyboardDidHide = () => {
        if (this.needMove) {
            this.scrollViewTo(this.moveH);
        }
        console.inputRef = null;
    }
    
    savePassword() {
        Keyboard.dismiss();
        let value = this.refs.form.getValue();
        if (!value) return;
        let { formType } = this.props.state
        createActions.savePassword(formType, value);
        this.clearForm(formType);
        this.refs.toast.show('保存成功');
    }
    clearForm(formType) {
        this.props.actions.changeType(formType);
    }
    changeFormType(formType) {
        if (formType != this.props.state.formType) {
            Keyboard.dismiss();
            this.props.actions.changeType(formType);
        }
    }
    onChange(value, path) {

    }
    scrollViewTo(offsetY) {
        this.refs.scroll.scrollTo({ y: offsetY, animated: true });
    }
    render() {
        let { formStruct, formOptions, formType } = this.props.state;
        return (
            <View style={styles.containerView} >
                <CreateNavBar savePassword={this.savePassword.bind(this)} currentModule={formType} changeFormType={this.changeFormType.bind(this)} />
                <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'
                    ref='scroll' iosalwaysBounceVertical={false} iosbounces={false}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.contentHeight = parseInt(contentHeight);
                    }}
                    keyboardShouldPersistTaps={'handled'}
                    onScrollEndDrag={(e) => {
                        this.moveH = e.nativeEvent.targetContentOffset.y;
                    }} >
                    <RealForm ref='form' type={tForm.struct(formStruct)} onChange={(value, path) => this.onChange(value, path)}
                        options={formOptions} />
                </ScrollView>
                <Toast ref="toast" position='center' />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        paddingBottom: 50,
        backgroundColor: '#efeef4',
    },
    container: {
        padding: 15,
        backgroundColor: 'white'
    }
});