import { combineReducers } from 'redux';
import {fetchReducer} from './fetchReducer';

const rootReducer = combineReducers({
    dice: fetchReducer
});

export default rootReducer;