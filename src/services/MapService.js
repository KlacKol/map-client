import axios from 'axios';
import {getRefreshToken, getToken} from "./LocalStorageService";
import jwtDecode from "jwt-decode";
import {updateTokens} from "./AuthService";

const api = process.env.REACT_APP_APP_API_URL + '/map';

export const createMarker = async (data) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    let date = Date.now();
    const user = jwtDecode(token);
    if (user && date <= user.exp) {
        console.log('work')
        await updateTokens({token, refreshToken}).then(res => {
          console.log(res, 'EEEEEEEEEEEEEEEEEEEEEEEE');
        })
    }
    return await axios.post(`${api}/create`, data)

};

export const generateRandomMarker = () => {
    return  axios.get(`${api}/generate/random`)
};

export const searchOnDate = async (data) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    let date = Date.now();
    const user = jwtDecode(token);
    if (user && date <= user.exp * 1000) {
        console.log('a');
        await updateTokens({token, refreshToken}).then(res => {
            console.log(res);
        })
    }
    return await axios.post(`${api}/search`, data)
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
