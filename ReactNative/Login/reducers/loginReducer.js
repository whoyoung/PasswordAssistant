
import * as types from '../actions/actionTypes';

const loginModules = {
    login: 'login',
    register: 'register'
}

const initState = {
    loginModule: loginModules.login,
    login: {
        userNamePlaceholder: '用户名',
        passwordPlaceholder: '密码'
    },
    register: {
        userNamePlaceholder: '"字母 数字 @ . _"的组合, 最少六位',
        passwordPlaceholder: '"字母 数字"的组合, 最少六位'
    }
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_login_changeModule':
            return {
                ...state,
                loginModule: action.loginModule
            }
        default:
            return state;
    }

}
