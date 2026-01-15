import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users/list');
  return response.data;
};

export const getTotalSeguidoresDoVendedor = async (sellerId) => {
  const response = await api.get(`/users/${sellerId}/followers/count`);
  return response.data;
}

export const getSeguidoresDoVendedor = async (sellerId, order = 'asc') => {
  order = `name_${order}`

  const response = await api.get(`/users/${sellerId}/followers/list?order=${order}`);
  return response.data;
}

export const getVendedoresSeguidosPorUsuario = async (buyerId, order) => {
  order = `name_${order}`

  const response = await api.get(`/users/${buyerId}/followed/list?order=${order}`);
  return response.data;
}