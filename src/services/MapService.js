import axios from 'axios';

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