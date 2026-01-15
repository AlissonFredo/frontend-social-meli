import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users/list');
  return response.data;
};