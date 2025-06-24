import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/bulletinboard';

export const getMessages = () => axios.get(API_BASE_URL);
export const postMessage = (data) => axios.post(API_BASE_URL, data); 