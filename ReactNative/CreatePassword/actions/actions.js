import * as types from './actionTypes';
import realm from '../../Realm/realm';
import tForm from 'tcomb-form-native';
import fieldNameDict from '../containers/fieldsName';

let passwordTypes = realm.objects('PasswordTypes');

export function changeType(formType) {
    let { formStruct, formOptions } = formStructFunction(formType);
    return {
        type: types.yh_createPassword_clearForm,
        formType: formType,
        formStruct: formStruct,
        formOptions: formOptions
    }
}

export function clearForm(formType) {
    let { formStruct, formOptions } = formStructFunction(formType);
    return {
        type: types.yh_createPassword_clearForm,
        formType: formType,
        formStruct: formStruct,
        formOptions: formOptions
    }
}

function formStructFunction(formType) {
    let formStruct = {};
    let formFields = {};
    let campareStr = 'typeKey = ' + formType;
    let passwordType = passwordTypes.filtered(campareStr);
    let fielArray = JSON.parse(passwordType[0].typeFiels);
    fielArray.forEach(function (element) {
        formStruct[element] = formFormatFunction(element);
        formFields[element] = fieldNameFunction(element, formType);

    }, this);
    let formOptions = {
        fields: formFields
    }
    return { formStruct, formOptions };
}

function formFormatFunction(element) {
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

function fieldNameFunction(element, formType) {
    let name;
    if (element != 'serverProvider') {
        name = fieldNameDict[element];
    } else {
        name = fieldNameDict['' + element + formType];
    }
    if (!name) {
        name = '未知';
    }
    return {
        label: name,
        onFocus: function () { 
           return async function (dispatch) {
                dispatch(inputRefFunction(element))
            }}
    };
}

export function inputRefFunction(element) {
    console.log('yh_createPassword_inputRef');
    return {
        type: types.yh_createPassword_inputRef,
        inputRef: element
    }
}