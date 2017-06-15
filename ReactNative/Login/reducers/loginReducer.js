
import * as types from '../actions/actionTypes';
import * as loginCommon from '../../Common/loginModule';
const initState = {
    userName: null,
    password: null,
    loginModule: loginCommon.loginModules.login,
    loginStatus: loginCommon.submitStatus.waittingSubmit,
    login: {
        userNamePlaceholder: '用户名',
        passwordPlaceholder: '密码'
    },
    register: {
        userNamePlaceholder: '"字母 数字 @ . _"的组合, 6-18位',
        passwordPlaceholder: '"字母 数字 @ . _ ,"的组合, 6-18位'
    },
    loginFail: '用户名或密码错误，或账号不存在，请重新输入',
    registerFail: '账号注册失败，请重新输入'
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_login_changeModule':
            return {
                ...state,
                loginModule: action.loginModule
            }
        case 'yh_login_submitInput':
            return {
                ...state,
                loginStatus: action.loginStatus,
                userName: userName,
                password: password
            }
        default:
            return state;
    }

}
