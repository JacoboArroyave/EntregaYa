import { Driver } from "../models/Driver";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/drivers";

// Obtener todos los conductores
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los conductores:", error);
    return [];
  }
};

// Obtener un conductor por ID
export const getDriverById = async (id: number): Promise<Driver | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el conductor por ID:", error);
    return null;
  }
};

// Crear un nuevo conductor
export const createDriver = async (driver: Omit<Driver, "id">): Promise<Driver | null> => {
  try {
    const response = await api.post(API_URL, driver);
    return response.data;
  } catch (error) {
    console.error("Error al crear el conductor:", error);
    return null;
  }
};

// Actualizar un conductor
export const updateDriver = async (id: number, driver: Partial<Omit<Driver, "id">>): Promise<Driver | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, driver);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el conductor:", error);
    return null;
  }
};

// Eliminar un conductor
export const deleteDriver = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el conductor:", error);
    return false;
  }
};
