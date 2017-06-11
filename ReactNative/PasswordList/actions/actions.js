import * as types from './actionTypes';

export function loadTypeKeys(){
    return {type:types.yh_passwordList_loadTypeKeys}
}

export function loadLastedPrimaryKey(){
    return {type:types.yh_passwordList_loadLastedPrimaryKey}
}

export function loadPasswordItems(){
    return {type:types.yh_passwordList_loadPasswordItems}
}

export function loadPasswordTypes(){
    return {type:types.yh_passwordList_loadPasswordTypes}
}

export function searchResults(searchResults){
    return {type:types.yh_passwordList_searchResults, searchResults:searchResults}
}

export function clearSearchResults(){
    return {type:types.yh_passwordList_clearSearchResults}
}

