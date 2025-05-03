import { Customer } from "../models/Customer";

const API_URL = "http://127.0.0.1:5000/customers";

// Get all customers
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener customers");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Get customer by ID
export const getCustomerById = async (id: string): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Customer no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create new customer
export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al crear customer");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update customer
export const updateCustomer = async (id: string, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al actualizar customer");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete customer
export const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar customer");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
