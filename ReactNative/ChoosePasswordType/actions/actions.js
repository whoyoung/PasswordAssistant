import * as types from './actionTypes';

export function changeType(formType) {
    return {
        type: types.yh_choosePasswordType_changeType,
        formType: formType
    }
}
