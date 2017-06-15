import * as types from './actionTypes';
import formStructAndOptions from '../../Common/formStructAndOptions'

let realm = console.realm;
let typeKeys = realm?realm.objects('TypeKeys'):[];
let lastedPrimaryKey = realm?realm.objects('LastedPrimaryKey'):[];
let passwordTypes = realm?realm.objects('PasswordTypes'):[];

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

function formStructFunction(formType) {
    return formStructAndOptions(formType);
}

export function savePassword(formType, value) {
    let newPrimaryId = getNewPrimaryId();
    let campareStr = 'typeKey = ' + formType;
    let passwordType = passwordTypes.filtered(campareStr);
    let fielArray = JSON.parse(passwordType[0].typeFields);
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

export function updatePassword(passwordId, value) {
    console.log(...value);
    realm.write(() => {
        realm.create('PasswordItems', {
            id: passwordId, ...value
        }, true);
    });
}
