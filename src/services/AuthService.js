import axios from 'axios';

const api = process.env.REACT_APP_APP_API_URL + '/auth';

export const loginUser = (data) => {
    return axios.post(`${api}/login`, data)
};

export const registerUser = (data) => {
    return axios.post(`${api}/registration`, data)
};

export const getRefresToken = (data) => {
    return axios.post(`${api}/refresh`, data)
}
