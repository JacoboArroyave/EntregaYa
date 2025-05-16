import { Menu } from "../models/Menu";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/menus";

// Obtener todos los menús
export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los menús:", error);
        return [];
    }
};
export const getMenusByIdRestaurant = async (id:string): Promise<Menu[]> => {
    try {
        
        const response = await api.get(`http://127.0.0.1:5000/restaurants/${id}/menus`);
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los menús:", error);
        return [];
    }
};


// Obtener un menú por ID
export const getMenuById = async (id: number): Promise<Menu | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el menú por ID:", error);
        return null;
    }
};

// Crear un nuevo menú
export const createMenu = async (menu: Omit<Menu, "id">): Promise<Menu | null> => {
    try {
        const response = await api.post(API_URL, menu);
        return response.data;
    } catch (error) {
        console.error("Error al crear el menú:", error);
        return null;
    }
};

// Actualizar un menú
export const updateMenu = async (id: number, menu: Partial<Omit<Menu, "id">>): Promise<Menu | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, menu);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el menú:", error);
        return null;
    }
};

// Eliminar un menú
export const deleteMenu = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el menú:", error);
        return false;
    }
};
