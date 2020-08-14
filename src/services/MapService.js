import axios from 'axios';
import {getToken} from "./LocalStorageService";
import jwtDecode from "jwt-decode";
import {getRefresToken} from "./AuthService";

const api = process.env.REACT_APP_APP_API_URL + '/map';

export const createMarker = (data) => {
    return axios.post(`${api}/create`, data)
};

export const generateRandomMarker = () => {
    return  axios.get(`${api}/generate/random`)
};

export const searchOnDate = (data) => {
    return axios.post(`${api}/search`, data)
};

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            let date = Date.now();
            const user = jwtDecode(token);
            if (date <= user.exp) {
                getRefresToken(token).then(r => {})
            } else {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    }
);
