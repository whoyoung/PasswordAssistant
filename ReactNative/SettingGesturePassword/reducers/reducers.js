
import * as types from '../actions/actionTypes';
import ConstDict from '../constDict';

const initState = {
    status: ConstDict.passwordStatus.normal,
    step: ConstDict.passwordStep.unlock,
    settingPassword: null,
    messages: {
        unlock: '请输入您的解锁密码',
        unlockError: '解锁密码错误，请重新输入',
        settingPassword: '请设置您的解锁密码',
        confirmPassword: '请确认您的解锁密码',
        confirmPasswordError: '两次输入结果不一致，请重新输入',
        lengthError: '请至少连接4个点',
        settingSuccess: '密码设置成功'
    }
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_settingGesturePassword_initStatus':
        case 'yh_settingGesturePassword_lengthError':
        case 'yh_settingGesturePassword_unlockError': 
        case 'yh_settingGesturePassword_unlockSuccess':
        case 'yh_settingGesturePassword_confirmPasswordError':
        case 'yh_settingGesturePassword_settingSuccess': 
            return {
                ...state,
                status: action.status,
                step: action.step
            }
        case 'yh_settingGesturePassword_confirmPassword': 
            return {
                ...state,
                status: action.status,
                step: action.step,
                settingPassword: action.settingPassword
            }
        default:
            return state;
    }

}
