import * as types from './actionTypes';
import realm from '../../Realm/realm';
import tForm from 'tcomb-form-native';
import fieldsName from '../containers/fieldsName';

let typeKeys = realm.objects('TypeKeys');
let lastedPrimaryKey = realm.objects('LastedPrimaryKey');
let passwordTypes = realm.objects('PasswordTypes');

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
    let formStruct = {};
    let formFields = {};
    let campareStr = 'typeKey = ' + formType;
    let passwordType = passwordTypes.filtered(campareStr);
    let fielArray = JSON.parse(passwordType[0].typeFields);
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
        name = fieldsName.fieldsNameDict[element];
    } else {
        name = fieldsName.fieldsNameDict['' + element + formType];
    }
    if (!name) {
        name = element;
    }
    return {
        label: name,
        onFocus: () => {
            console.inputRef = element;
        }
    }
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
