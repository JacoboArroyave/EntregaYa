import { Order } from "../models/Order";

const API_URL = import.meta.env.VITE_API_URL3 + "/order" || "";

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener orders");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Order no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create new order
export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Error al crear order");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update order
export const updateOrder = async (id: string, order: Partial<Order>): Promise<Order | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Error al actualizar order");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete order
export const deleteOrder = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar order");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
