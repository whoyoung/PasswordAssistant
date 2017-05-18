import {combineReducers} from 'redux';
import listReducer from '../../PasswordList/reducers'
const appReducers = combineReducers({
    listReducer
});

export default appReducers;