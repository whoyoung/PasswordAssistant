
import * as types from '../actions/actionTypes';

const initState = {
    offsetY: 0,
    formType: 0,
    formStruct: {}
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_createPassword_changeType': 
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct
            }
        case 'yh_createPassword_clearForm': 
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct
            }
        case 'yh_createPassword_updateOffsetY': 
            return {
                ...state,
                offsetY: action.offsetY,
            }
        default:
            return state;
    }

}
