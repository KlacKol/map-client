import axios from 'axios';

const api = process.env.REACT_APP_APP_API_URL;

export const getAllMarker = () => {
    return axios.get(`${api}/map`)
};

export const createMarker = (data) => {
    return axios.post(`${api}/map/create`, data)
};

export const generateRandomMarker = () => {
    return  axios.get(`${api}/map/generate/random`)
};

export const searchOnDate = (data) => {
    return axios.post(`${api}/map/search`, data)
};