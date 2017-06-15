import * as types from './actionTypes';
import formStructAndOptions from '../../Common/formStructAndOptions'
let realm = console.realm;
let lastedPrimaryKey = realm?realm.objects('LastedPrimaryKey'):[];
let passwordTypes = realm?realm.objects('PasswordTypes'):[];

export function changeType(formType) {
    let { formStruct, formOptions } = formStructFunction(formType);
    return {
        type: types.yh_createPassword_changeType,
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
    return formStructAndOptions(formType);
}

export function savePassword(formType, value) {
    let newPrimaryId = getNewPrimaryId();
    let campareStr = 'typeKey = ' + formType;
    let passwordType = passwordTypes.filtered(campareStr);
    let fieldsArray = JSON.parse(passwordType[0].typeFields);
    let createDict = {
        id: newPrimaryId,
        passwordType: formType,
        creationDate: new Date()
    }
    fieldsArray.forEach(function (element) {
        createDict[element] = value[element];
    }, this);
    writeTransation(createDict);
}

function getNewPrimaryId() {
    let primaryKey = lastedPrimaryKey[0];
    let tempKey = primaryKey.lastedId + 1;
    realm.write(() => {
        realm.create('LastedPrimaryKey', {
            id: primaryKey.id, lastedId: tempKey
        }, true);
    });
    return tempKey;
}
function writeTransation(createDict) {
    return realm.write(() => {
        realm.create('PasswordItems', createDict);
    });
}
