import * as types from './actionTypes';
import { Actions } from 'react-native-router-flux';
import YHNativePassword from '../../../Native/NativePassword';
import ConstDict from '../constDict';

export function initStatus(gesturePassword) {
    let status = ConstDict.passwordStatus.normal;
    let step;
    if (gesturePassword) {
        step = ConstDict.passwordStep.unlock;
    } else {
        step = ConstDict.passwordStep.settingPassword;
    }
    return { 
        type: types.yh_settingGesturePassword_initStatus, 
        status: status, 
        step: step 
    }
}

export function inputEnd(password, step, originPassword) {
    switch (step) {
        case ConstDict.passwordStep.unlock:
        case ConstDict.passwordStep.unlockError: {
            // alert(password+'=='+originPassword);
            if (password != originPassword) {
                console.log('==========unlockError');
                return {
                    type: types.yh_settingGesturePassword_unlockError,
                    step: ConstDict.passwordStep.unlockError,
                    status: ConstDict.passwordStatus.wrong
                }
            } else {
                console.log('===========unlockSuccess');
                return {
                    type: types.yh_settingGesturePassword_unlockSuccess,
                    step: ConstDict.passwordStep.settingPassword,
                    status: ConstDict.passwordStatus.normal
                }
            }
        }
        case ConstDict.passwordStep.settingPassword:
        case ConstDict.passwordStep.lengthError: {
            if (password.length < 4) {
                return {
                    type: types.yh_settingGesturePassword_lengthError,
                    step: ConstDict.passwordStep.lengthError,
                    status: ConstDict.passwordStatus.wrong
                }
            } else {
                return {
                    type: types.yh_settingGesturePassword_confirmPassword,
                    settingPassword: password,
                    step: ConstDict.passwordStep.confirmPassword,
                    status: ConstDict.passwordStatus.normal
                }
            }
        }
        case ConstDict.passwordStep.confirmPassword: 
        case ConstDict.passwordStep.confirmPasswordError:{
            if (password != originPassword) {
                return {
                    type: types.yh_settingGesturePassword_confirmPasswordError,
                    step: ConstDict.passwordStep.confirmPasswordError,
                    status: ConstDict.passwordStatus.wrong
                }
            } else {
                YHNativePassword.changeGesturePassword(password);
                return {
                    type: types.yh_settingGesturePassword_settingSuccess,
                    step: ConstDict.passwordStep.settingSuccess,
                    status: ConstDict.passwordStatus.right
                }
            }
        }
        default:
            break;
    }
}




