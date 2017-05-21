
import * as types from '../actions/actionTypes';

const initState = {
    shouldRefresh: false,
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_passwordList_listChange': {
            return {
                ...state,
                shouldRefresh: true
            }
        }
            break;
        case 'yh_passwordList_resetRefreshState': {
            return {
                ...state,
                shouldRefresh: false
            }
        }
            break;
        default:
            return state;
    }

}
