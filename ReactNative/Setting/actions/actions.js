import * as types from './actionTypes';

export function gestureSwitchChange(gestureSwitchOn) {
    return { type: types.yh_setting_gestureSwitchChange, gestureSwitchOn:gestureSwitchOn }
}

export function gesturePasswordChange(gesturePassword) {
    return { type: types.yh_setting_gesturePasswordChange, gesturePassword: gesturePassword }
}

export function initState(dict) {
    return {
        type: types.yh_setting_initState,
        gestureSwitchOn: dict['gestureSwitchOn'],
        gesturePassword: dict['gesturePassword']
    }
}


