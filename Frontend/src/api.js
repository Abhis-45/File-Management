import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const uploadFile = (data, config) => API.post('/files/upload', data, config);
export const getFiles = () => API.get('/files');
export const deleteFile = (id) => API.delete(`/files/${id}`);
