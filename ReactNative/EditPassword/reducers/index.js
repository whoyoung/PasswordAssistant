
import * as types from '../actions/actionTypes';

const initState = {
    formType: null,
    formStruct: {},
    formOptions: {},
    formValue: {},
    navTitle: ''
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_editPassword_init':
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct,
                formOptions: action.formOptions,
                formValue: action.formValue,
                navTitle: action.navTitle
            }
        case 'yh_editPassword_clearForm':
            return {
                ...state,
                formType: action.formType,
                formStruct: action.formStruct,
                formOptions: action.formOptions,
                formValue: {}
            }
        default:
            return state;
    }

}
