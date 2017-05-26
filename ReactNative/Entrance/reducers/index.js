import {combineReducers} from 'redux';
import listReducer from '../../PasswordList/reducers';
import createReducer from '../../CreatePassword/reducers/'
const appReducers = combineReducers({
    listReducer,
    createReducer
});

export default appReducers;