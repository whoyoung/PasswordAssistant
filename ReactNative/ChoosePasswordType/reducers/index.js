
import * as types from '../actions/actionTypes';

const initState = {
    formType: 0
}

export default function reducers(state = initState, action = {}) {
    switch (action.type) {
        case 'yh_choosePasswordType_changeType':
            return {
                ...state,
                formType: action.formType
            }
        default:
            return state;
    }

}
