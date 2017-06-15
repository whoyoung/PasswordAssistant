import * as types from './actionTypes';
import * as loginCommon from '../../Common/loginModule';
import Realm from 'realm';
import realm from '../../Realm/realm'
export function changeModule(loginModule) {
    return { type: types.yh_login_changeModule, loginModule: loginModule }
}

export function submitInput(loginModule, userName, password) {
    return async function (dispatch) {
        if (loginModule == loginCommon.loginModules.login) {
            Realm.Sync.User.login('http://localhost:9080',
                userName,
                password,
                (error, user) => {
                    if (!error) {
                        console.realm = realm;
                        return {
                            type: types.yh_login_submitInput,
                            loginStatus: loginCommon.submitStatus.loginSuccess,
                            userName: userName,
                            password: password
                        }
                    } else {
                        return {
                            type: types.yh_login_submitInput,
                            loginStatus: loginCommon.submitStatus.loginFail,
                            userName: null,
                            password: null
                        }
                    }
                });
        } else {
            Realm.Sync.User.register('http://localhost:9080',
                userName,
                password,
                (error, user) => {
                    if (!error) {
                        console.realm = realm;
                        return {
                            type: types.yh_login_submitInput,
                            loginStatus: loginCommon.submitStatus.loginSuccess,
                            userName: userName,
                            password: password
                        }
                    } else {
                        return {
                            type: types.yh_login_submitInput,
                            loginStatus: loginCommon.submitStatus.registerFail,
                            userName: null,
                            password: null
                        }
                    }
                });
        }
    }

}



