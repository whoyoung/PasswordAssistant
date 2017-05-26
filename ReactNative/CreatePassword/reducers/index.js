
import * as types from '../actions/actionTypes';

const initState = {
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
        default:
            return state;
    }

}
