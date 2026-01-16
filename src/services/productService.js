import api from './api';

export const getPublicacoesRecentes = async (buyerId, order) => {
    order = `date_${order}`
    const response = await api.get(`/products/followed/${buyerId}/list?order=${order}`);
    return response.data;
};

export const postCadastrarProduto = async (post) => {
    try {
        const response = await api.post(`/products/publish`, post);
        return { data: response.data, status: response.status };
    } catch (error) {
        return error.response.data
    }
} 