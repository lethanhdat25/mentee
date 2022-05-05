import {combineReducers} from "@reduxjs/toolkit";
import authReducer from './auth/auth.reducer';
import todoReducer from './todo/todo.reducer';

const rootReducer=combineReducers({
    auth:authReducer,
    todo:todoReducer
});
export default rootReducer;
