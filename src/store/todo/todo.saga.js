import {call, all, takeEvery, put} from 'redux-saga/effects';
import {
    createTodo, createTodoFailed,
    createTodoSuccess,
    deleteTodo, deleteTodoFailed, deleteTodoSuccess,
    getTodo,
    getTodoFailed,
    getTodoSuccess,
    updateTodo, updateTodoFailed, updateTodoSuccess
} from './todo.reducer';
import {createApi, deleteApi, getAllApi, updateApi} from './todo.api';

function* getAllSaga(action) {
    try {
        const res = yield call(getAllApi, action.payload);
        yield  put(getTodoSuccess(res.data));
    } catch (error) {
        yield put(getTodoFailed(error.code));
    }
}

function* createTodoSaga(action) {
    try {
        yield call(createApi, action.payload);
        yield  put(createTodoSuccess());
    } catch (error) {
        yield put(createTodoFailed(error.code));
    }
}

function* updateTodoSaga(action) {
    try {
        yield call(updateApi, action.payload);
        yield  put(updateTodoSuccess());
    } catch (error) {
        yield put(updateTodoFailed(error.code));
    }
}

function* deleteTodoSaga(action) {
    try {
        yield call(deleteApi, action.payload);
        yield  put(deleteTodoSuccess());
    } catch (error) {
        yield put(deleteTodoFailed(error.code));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(getTodo.type, getAllSaga),
        takeEvery(createTodo.type, createTodoSaga),
        takeEvery(updateTodo.type, updateTodoSaga),
        takeEvery(deleteTodo.type, deleteTodoSaga)
    ]);
}
