import {combineReducers} from 'redux';
import listReducer from '../../PasswordList/reducers';
import createReducer from '../../CreatePassword/reducers/'
import chooseReducer from '../../ChoosePasswordType/reducers/'
const appReducers = combineReducers({
    listReducer,
    createReducer,
    chooseReducer
});

export default appReducers;