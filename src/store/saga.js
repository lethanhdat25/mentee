
import { all } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import todoSaga from './todo/todo.saga';
//TODO: create root saga

export default function* rootSaga() {
    yield all([authSaga(),todoSaga()]);
}
