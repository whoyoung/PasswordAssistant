
import * as types from '../actions/actionTypes';

const loginStatus = {
    normal: 'normal',
    inputError: 'inputError',
    valiteError: 'valiteError'
}

const initState = {
    loginStatu: loginStatus.normal
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_login_loginClick':
            return {
                ...state,
                loginStatu: action.loginStatu
            }
        default:
            return state;
    }

}
