import {call, all, takeEvery, put} from 'redux-saga/effects';
import {login, loginFailed, loginSuccess, refreshToken, refreshTokenSuccess, register} from './auth.reducer';

import {loginApi, refreshTokenApi, signUpApi} from './auth.api';
import Axios from 'axios';

function* loginSaga(action) {
    const {data, callback} = action.payload;
    try {
        const res = yield call(loginApi, data);
        const {accessToken,refreshToken} = res.data;

        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);

        Axios.interceptors.request.use((config)=>{
            config.headers.Authorization = "Bearer " + accessToken;
            return config
        })

        yield  put(loginSuccess(res.data));

        callback();
    } catch (error) {
        yield put(loginFailed(error.code));
    }
}

function* refreshTokenSaga(action){
    const data = action.payload;
    const res = yield call(refreshTokenApi, data);
    yield  put(refreshTokenSuccess(res.data));
    localStorage.setItem("accessToken",res.data);
    Axios.interceptors.request.use((config)=>{
        config.headers.Authorization = "Bearer " + res.data;
        return config
    })
};

function* registerSaga(action) {
    const {data, callback} = action.payload;
    try {
        yield call(signUpApi, data);
        const res = yield call(loginApi, data);
        yield  put(loginSuccess(res.data));
        const {accessToken,refreshToken} = res.data;

        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);

        Axios.interceptors.request.use((config)=>{
            config.headers.Authorization = "Bearer " + accessToken;
            return config
        })
        callback();
    } catch (error) {
        yield put(loginFailed(error.code));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(login.type, loginSaga),takeEvery(refreshToken.type,refreshTokenSaga),takeEvery(register.type,registerSaga)]);
}
