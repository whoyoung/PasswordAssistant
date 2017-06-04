
import * as types from '../actions/actionTypes';

const initState = {
    gestureSwitchOn: false,
    gesturePassword: null
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_setting_gestureSwitchChange': 
            return {
                ...state,
                gestureSwitchOn: action.gestureSwitchOn
            }
        case 'yh_setting_gesturePasswordChange': 
            return {
                ...state,
                gesturePassword: action.gesturePassword
            }
        case 'yh_setting_initState': 
            return {
                ...state,
                gestureSwitchOn: action.gestureSwitchOn,
                gesturePassword: action.gesturePassword
            }
        default:
            return state;
    }

}
