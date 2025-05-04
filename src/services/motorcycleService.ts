import { Motorcycle } from "../models/Motorcycle";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycles";

// Obtener todas las motos
export const getMotorcycles = async (): Promise<Motorcycle[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las motos:", error);
    return [];
  }
};

// Obtener una moto por ID
export const getMotorcycleById = async (id: number): Promise<Motorcycle | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la moto por ID:", error);
    return null;
  }
};

// Crear una nueva moto
export const createMotorcycle = async (motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> => {
  try {
    const response = await api.post(API_URL, motorcycle);
    return response.data;
  } catch (error) {
    console.error("Error al crear la moto:", error);
    return null;
  }
};

// Actualizar una moto existente
export const updateMotorcycle = async (id: number, motorcycle: Partial<Omit<Motorcycle, "id">>): Promise<Motorcycle | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, motorcycle);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la moto:", error);
    return null;
  }
};

// Eliminar una moto por ID
export const deleteMotorcycle = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la moto:", error);
    return false;
  }
};
