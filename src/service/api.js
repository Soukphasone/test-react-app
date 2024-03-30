import axios from 'axios';
const API_BASE_URL = 'https://soukphasone.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchOrders = async (sign) => {
    const userId = '66043b8556141ca8c49575aa'
    try {
        const response = await api.get(`/orders?status=ONLINE&sign=${sign}&userId=${userId}`);
        return response.data;
    } catch (error) {
    }
};
export const updateOrderStatus = async (id, status, headers) => {
    try {
        const response = await api.put(`/order/${id}`, { status }, { headers });
        return response.data;
    } catch (error) {
    }
};
