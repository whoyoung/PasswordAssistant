import {combineReducers} from 'redux';
import listReducer from '../../PasswordList/reducers';
import createReducer from '../../CreatePassword/reducers/';
import chooseReducer from '../../ChoosePasswordType/reducers/';
import editReducer from '../../EditPassword/reducers/'
const appReducers = combineReducers({
    listReducer,
    createReducer,
    chooseReducer,
    editReducer
});

export default appReducers;