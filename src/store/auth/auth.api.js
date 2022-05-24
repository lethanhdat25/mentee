import Axios from 'axios';

const loginPath = '/auth/login';
const signUpPath = '/auth/register';
const refreshTokenPath = '/token/refresh';
export const loginApi = (data) => {
    return Axios.post(loginPath, data);
};
export const signUpApi = (data) => {
    return Axios.post(signUpPath, data);

};

export const refreshTokenApi = (data) => {
    return Axios.post(refreshTokenPath, data);

};
