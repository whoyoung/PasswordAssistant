
import * as types from '../actions/actionTypes';

const initState = {
    formType: 1,
    formStruct: {},
    formOptions: {},
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_createPassword_changeType':
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct,
                formOptions: action.formOptions
            }
        case 'yh_createPassword_clearForm':
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct,
                formOptions: action.formOptions
            }
        

        default:
            return state;
    }

}
