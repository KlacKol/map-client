import axios from 'axios';
import {getRefreshToken, getToken, setRefreshToken, setToken} from "./LocalStorageService";
import jwtDecode from "jwt-decode";
import {updateTokens} from "./AuthService";

const api = process.env.REACT_APP_APP_API_URL + '/map';

export const createMarker = async (res) => {
    return await helper(res, 'create');

};

export const generateRandomMarker = async () => {
    return  axios.get(`${api}/generate/random`)
};

export const searchOnDate = async (res) => {
    return await helper(res, 'search');
};

const helper = async (res, path) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    let date = Date.now() + 10;
    const user = jwtDecode(token);
    if (user && date >= user.exp * 1000) {
        return await updateTokens({token, refreshToken}).then(async({data}) => {
            setToken(data.token);
            setRefreshToken(data.refreshToken);
            return await axios.post(`${api}/${path}`, res)
        })
    }
    return await axios.post(`${api}/${path}`, res)
};

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);
