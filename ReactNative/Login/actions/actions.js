import * as types from './actionTypes';
const loginStatus = {
    normal: 'normal',
    inputError: 'inputError',
    valiteError: 'valiteError'
}
export function loadTypeKeys(account,password){
    return {type:types.yh_login_loginClick, loginStatu:loginStatus.normal}
}


