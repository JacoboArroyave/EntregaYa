import { Restaurant } from "../models/Restaurant";

const API_URL = "http://127.0.0.1:5000/restaurants";

// Get all restaurants
export const getRestaurants = async (): Promise<Restaurant[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener restaurantes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Get restaurant by ID
export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Restaurante no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create new restaurant
export const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Error al crear restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update restaurant
export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Error al actualizar restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete restaurant
export const deleteRestaurant = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar restaurante");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};