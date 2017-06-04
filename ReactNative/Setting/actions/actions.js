import * as types from './actionTypes';
import YHNativePassword from '../../../Native/NativePassword';

export function gestureSwitchChange(gestureSwitchOn) {
    YHNativePassword.changeGestureSwitchStatus(gestureSwitchOn ? '1' : '0')
    return { type: types.yh_setting_gestureSwitchChange, gestureSwitchOn: gestureSwitchOn }
}

export function gesturePasswordChange(gesturePassword) {
    return { type: types.yh_setting_gesturePasswordChange, gesturePassword: gesturePassword }
}

export function initState() {
    return async function (dispatch) {
        let dict = await YHNativePassword.requireGestureSwitchStatusAndPassword();
        let gestureSwitchOn;
        let gesturePassword;
        if (dict['gestureSwitchStatus'] == '1') {
            gestureSwitchOn = true;
        } else {
            gestureSwitchOn = false;
        }
        if (dict['gesturePassword'] == '0') {
            gesturePassword = null;
        }
        dispatch({
            type: types.yh_setting_initState,
            gestureSwitchOn: gestureSwitchOn,
            gesturePassword: gesturePassword
        })
    }

}


