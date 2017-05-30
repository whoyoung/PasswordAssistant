import * as types from './actionTypes';
import realm from '../../Realm/realm';
import tForm from 'tcomb-form-native';

let passwordTypes = realm.objects('PasswordTypes');

export function changeType(formType) {
    let struct = formStruct(formType);
    return {
        type: types.yh_createPassword_changeType,
        formType: formType,
        formStruct: struct
    }
}

export function clearForm(formType) {
    let struct = formStruct(formType);
    return {
        type: types.yh_createPassword_clearForm,
        formType: formType,
        formStruct: struct
    }
}

function formStruct(formType) {
    let formStruct = {};
    let campareStr = 'typeKey = ' + formType;
    let passwordType = passwordTypes.filtered(campareStr);
    let fielArray = JSON.parse(passwordType[0].typeFiels);
    fielArray.forEach(function (element) {
        formStruct[element] = formFormat(element);
    }, this);
    return formStruct;
}

function formFormat(element) {
    switch (element) {
        case 'serverProvider':
            return tForm.String;
        case 'mobilePhone':
        case 'bankCardNum':
        case 'zipCode':
        case 'telephone':
        case 'credentialsNum':
            return tForm.maybe(tForm.Number);
        default:
            return tForm.maybe(tForm.String);
    }
}

export function updateOffsetY(offsetY) {
    return {
        type: types.yh_createPassword_updateOffsetY,
        offsetY: offsetY
    }
}