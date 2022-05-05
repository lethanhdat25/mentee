import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    user: null,
    errorCode: '',
    refreshToken:false,
    isAuthenticated:false
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.errorCode = '';
            state.isAuthenticated = true;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
        },
        register: (state) => {
            state.loading = true;
        },

        registerFailed: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
        },

        logout: (state) => {
            state.loading = false;
            state.user = null;
            state.errorCode = '';
        },
        refreshToken: (state, action) => {
            state.refreshToken = true;

        },
        refreshTokenSuccess: (state, action) => {
            state.refreshToken = false;
            state.user = {...state.user, accessToken: action.payload};
        }
    }
});

export default authSlice.reducer;
//Action
export const {login, loginSuccess, loginFailed, logout, refreshToken, refreshTokenSuccess,register} = authSlice.actions;
