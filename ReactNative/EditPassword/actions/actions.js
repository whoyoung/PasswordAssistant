import * as types from './actionTypes';
import realm from '../../Realm/realm';
import tForm from 'tcomb-form-native';
import fieldsName from '../../CreatePassword/containers/fieldsName';

let typeKeys = realm.objects('TypeKeys');
let lastedPrimaryKey = realm.objects('LastedPrimaryKey');
let passwordTypes = realm.objects('PasswordTypes');

export function editFormValue(rowData) {
    let formType = rowData['passwordType'];
    let formValue = {};
    let navTitle = '编辑';
    for (var key in rowData) {
        if (key == 'id' || key == 'creationDate' || key == 'passwordType') {
            continue;
        }
        if (key == 'serverProvider') {
            navTitle = rowData[key];
        }
        formValue[key] = rowData[key];
    }
    console.log('====================================rowDataformValue');
    console.log(formValue);
    console.log('====================================');
    let { formStruct, formOptions } = formStructFunction(formType);
    return {
        type: types.yh_editPassword_init,
        formType: formType,
        formStruct: formStruct,
        formOptions: formOptions,
        formValue: formValue,
        navTitle: navTitle
    }
}

export function clearForm(rowData) {
    let formType = rowData['passwordType'];
    let { formStruct, formOptions } = formStructFunction(formType);
    return {
        type: types.yh_editPassword_clearForm,
        formType: formType,
        formStruct: formStruct,
        formOptions: formOptions,
        formValue: {}
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
        name = fieldsName.fieldsNameDict[element];
    } else {
        name = fieldsName.fieldsNameDict['' + element + formType];
    }
    if (!name) {
        name = '未知';
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
    let fielArray = JSON.parse(passwordType[0].typeFiels);
    let createDict = {
        id: newPrimaryId,
        passwordType: formType,
        creationDate: new Date()
    }
    fielArray.forEach(function (element) {
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
