import { Order } from "../models/Order";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/orders";

// Obtener todas las órdenes
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las órdenes:", error);
        return [];
    }
};

// Obtener una orden por ID
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la orden por ID:", error);
        return null;
    }
    
};

// Crear una nueva orden
export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await api.post(API_URL, order);
        return response.data;
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return null;
    }
};

// Actualizar una orden
export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return null;
    }
};

// Eliminar una orden
export const deleteOrder = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        return false;
    }
};
