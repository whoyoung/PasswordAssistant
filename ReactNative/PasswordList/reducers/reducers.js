
import * as types from '../actions/actionTypes';

const initState = {
    loadTypeKeysDone: false,
    loadLastedPrimaryKeyDone: false,
    loadPasswordItemsDone: false,
    loadPasswordTypesDone: false,
    searchResults: []
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
        case 'yh_passwordList_searchResults':
            return {
                ...state,
                searchResults: action.searchResults
            }
        case 'yh_passwordList_clearSearchResults':
            return {
                ...state,
                searchResults: []
            }
        default:
            return state;
    }

}
