import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const workerService = {
  getAllWorkers: () => api.get('/workers'),
  createWorker: (workerData) => api.post('/workers', workerData),
  uploadFile: (workerName, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/workers/${workerName}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  downloadFile: (workerName, fileName) => 
    api.get(`/workers/${workerName}/download/${fileName}`, {
      responseType: 'blob',
    }),
  listFiles: (workerName) => api.get(`/workers/${workerName}/files`),
};

export default api; 