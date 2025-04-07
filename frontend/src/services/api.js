// src/services/api.js
import axios from 'axios';

// Base API URL - make sure this matches your backend URL
const API_URL = 'http://localhost:4004/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    localStorage.removeItem('token');
    window.location.href = '/login';
    }
    console.error('Response error:', error);
    return Promise.reject(error);
}
);
api.getCurrentUser=()=> api.get('/users/current')

//patient Api:
api.getCurrentPatient=()=>api.get('/patients/current');
api.getPatientsForDoctor=()=>api.get('/patients');
api.getPatient=(id)=>api.get(`/patients/${id}`);
api.addPatient=(data)=>api.post('/patients',data);
api.updatePatient=(id,data)=>api.patch(`/patients/${id}`,data)
api.deletePatient=(id)=>api.delete(`/patients/${id}`)

//prescription Api:

api.createPrescription=(id,data)=>api.post(`/prescriptions/${id}`,data);
api.getPrescriptionsForPatient=(Patientid)=>api.get(`/prescriptions/${Patientid}`);
api.deletePrescription=(id)=>api.delete(`/prescriptions/${id}`);

// health Parameter Api 

api.createHealthParameters=(data)=>api.post('/healthparameters',data);
api.getHealthParametersForPatient=(patientId)=>api.get(`/healthparameters/${patientId}`)
api.deleteHealthParameter=(id)=>api.delete(`/healthparameters/${id}`)
//Notification 
api.getNotificationsForUser=()=>api.get('/notifications');
api.markNotificationAsRead=(id)=>api.patch(`/notifications/${id}/read`)

export default api;