export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    return localStorage.removeItem('token');
};

