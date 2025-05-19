import { Photo } from "../models/Photo";
import api from "../interceptors/axiosInterceptor";

const ENDPOINT = "/photos";
    
// Obtener todas las fotos
export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await api.get(ENDPOINT);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las fotos:", error);
        return [];
    }
};

// Obtener una foto por ID
export const getPhotoById = async (id: string): Promise<Photo | null> => {
    try {
        const response = await api.get(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la foto por ID:", error);
        return null;
    }
};

// Crear una nueva foto
export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await api.post(ENDPOINT, photo);
        return response.data;
    } catch (error) {
        console.error("Error al crear la foto:", error);
        return null;
    }
};

// Actualizar una foto
export const updatePhoto = async (id: string, photo: Partial<Photo>): Promise<Photo | null> => {
    try {
        const response = await api.put(`${ENDPOINT}/${id}`, photo);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la foto:", error);
        return null;
    }
};

// Eliminar una foto
export const deletePhoto = async (id: string): Promise<boolean> => {
    try {
        await api.delete(`${ENDPOINT}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la foto:", error);
        return false;
    }
};
