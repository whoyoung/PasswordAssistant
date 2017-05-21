import * as types from './actionTypes';

export function refreshList(){
    return {type:types.yh_passwordList_listChange}
}

export function resetRefreshState(){
    return {type:types.yh_passwordList_resetRefreshState}
}

