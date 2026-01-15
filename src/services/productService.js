import api from './api';

export const getPublicacoesRecentes = async (buyerId, order) => {
    order = `date_${order}`
    const response = await api.get(`/products/followed/${buyerId}/list?order=${order}`);
    return response.data;
};