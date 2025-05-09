import { Product } from "../models/Product";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/products";

// Obtenemos todos los productos
export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        return [];
    }
};

// Obtenemos el producto por ID
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el producto por el id:", error);
        return null;
    }
};

// Creamos un nuevo producto
export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await api.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto:", error);
        return null;
    }
};

// Actualizamos un producto
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return null;
    }
};

// Eliminamos un producto
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return false;
    }
};
