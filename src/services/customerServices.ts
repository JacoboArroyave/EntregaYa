import { Customer } from "../models/Customer";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/customers";

// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los clientes:", error);
        return [];
    }
};


// Obtener un cliente por ID
export const getCustomerById = async (id: string): Promise<Customer | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el cliente por ID:", error);
        return null;
    }
};
// Obtener un cliente por email
export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    try {
        const response = await api.get(`${API_URL}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el cliente por email:", error);
        return null;
    }
};

// Crear un nuevo cliente
export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await api.post(API_URL, customer);
        return response.data;
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        return null;
    }
};

// Actualizar un cliente
export const updateCustomer = async (id: string, customer: Partial<Omit<Customer, "id">>): Promise<Customer | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, customer);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        return null;
    }
};

// Eliminar un cliente
export const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        return false;
    }
};
