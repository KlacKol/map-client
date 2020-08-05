import axios from 'axios';

const api = process.env.REACT_APP_APP_API_URL;

export const getAllMarker = () => {
    return axios.get(`${api}/map`)
};