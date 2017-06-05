
import * as types from '../actions/actionTypes';

const initState = {
    
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_settingGesturePassword_unlock': 
            return {
                ...state
            }
        case 'yh_settingGesturePassword_input': 
            return {
                ...state
            }
        case 'yh_settingGesturePassword_repeatInput': 
            return {
                ...state
            }
        default:
            return state;
    }

}
