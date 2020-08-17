export const setToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const getToken = () => {
    return  localStorage.getItem('access_token');
};

export const clearToken = () => {
    localStorage.removeItem('access_token');
};

export const setRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token);
};

export const getRefreshToken = () => {
    return  localStorage.getItem('refresh_token');
};

export const clearRefreshToken = () => {
    localStorage.removeItem('refresh_token');
};

