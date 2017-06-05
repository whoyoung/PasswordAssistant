import * as types from './actionTypes';

export function unlock() {
    return { type: types.yh_settingGesturePassword_unlock }
}

export function input() {
    return { type: types.yh_settingGesturePassword_input }
}

export function repeatInput() {
    return {
        type: types.yh_settingGesturePassword_repeatInput
    }
}



