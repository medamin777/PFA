// src/services/auth.js
import api from './api';
import { jwtDecode } from 'jwt-decode';

export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    const { token } = response.data;
    
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    // Decode the token to get user info
    const user = jwtDecode(token);
    
    // Return user info
    return user;
  } catch (error) {
    throw error;
  }
};
export const getCurrentUser = async () => {
    try {
      const response = await api.get('/users/current')
      return response.data;
    
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  };
  


export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

//return the user from the token 

  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  


export const register = async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };