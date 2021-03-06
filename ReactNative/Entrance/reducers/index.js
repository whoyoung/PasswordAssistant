import {combineReducers} from 'redux';
import listReducer from '../../PasswordList/reducers';
import createReducer from '../../CreatePassword/reducers';
import chooseReducer from '../../ChoosePasswordType/reducers';
import editReducer from '../../EditPassword/reducers';
import settingReducer from '../../Setting/reducers';
import settingGesturePasswordReducer from '../../SettingGesturePassword/reducers'

const appReducers = combineReducers({
    listReducer,
    createReducer,
    chooseReducer,
    editReducer,
    settingReducer,
    settingGesturePasswordReducer
});

export default appReducers;