import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users/list');
  return response.data;
};

export const getTotalSeguidoresDoVendedor = async (sellerId) => {
  const response = await api.get(`/users/${sellerId}/followers/count`);
  return response.data;
}