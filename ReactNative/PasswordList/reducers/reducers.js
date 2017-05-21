
import * as types from '../actions/actionTypes';

const initState = {
    loadTypeKeysDone: false,
    loadLastedPrimaryKeyDone: false,
    loadPasswordItemsDone: false,
    loadPasswordTypesDone: false,
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_passwordList_loadTypeKeys': 
            return {
                ...state,
                loadTypeKeysDone: true
            }
        case 'yh_passwordList_loadLastedPrimaryKey': 
            return {
                ...state,
                loadLastedPrimaryKeyDone: true
            }
        case 'yh_passwordList_loadPasswordItems': 
            return {
                ...state,
                loadPasswordItemsDone: true
            }
        case 'yh_passwordList_loadPasswordTypes': 
            return {
                ...state,
                loadPasswordTypesDone: true
            }
        default:
            return state;
    }

}
