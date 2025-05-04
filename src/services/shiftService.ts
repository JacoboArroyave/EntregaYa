import { Shift } from "../models/Shift";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/shifts";

// Obtener todos los turnos
export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los turnos:", error);
        return [];
    }
};

// Obtener un turno por ID
export const getShiftById = async (id: number): Promise<Shift | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el turno por ID:", error);
        return null;
    }
};

// Crear un nuevo turno
export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await api.post(API_URL, shift);
        return response.data;
    } catch (error) {
        console.error("Error al crear turno:", error);
        return null;
    }
};

// Actualizar un turno existente
export const updateShift = async (id: number, shift: Partial<Shift>): Promise<Shift | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, shift);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar turno:", error);
        return null;
    }
};

// Eliminar un turno
export const deleteShift = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar turno:", error);
        return false;
    }
};
