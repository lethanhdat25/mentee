import Axios from 'axios';

const loginPath = '/user/sign-in';
const signUpPath = '/user';
const refreshTokenPath = '/user/reissue';
export const loginApi = (data) => {
    return Axios.post(loginPath, data);
};
export const signUpApi = (data) => {
    return Axios.post(signUpPath, data);

};

export const refreshTokenApi = (data) => {
    return Axios.post(refreshTokenPath, data);

};
