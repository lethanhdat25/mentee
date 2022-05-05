import Axios from 'axios';

const todoPath = '/todo';

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    Axios.interceptors.request.use((config) => {

        config.headers.Authorization = 'Bearer ' + accessToken;
        return config;
    });
}
export const getAllApi = (page) => {
    return Axios.get(todoPath, {params: {page}});
};

export const createApi = (data) => {
    return Axios.post(todoPath, data);
};

export const updateApi = (data) => {
    return Axios.patch(todoPath, data);
};

export const deleteApi = (id) => {
    return Axios.delete(`${todoPath}/${id}`);
};
