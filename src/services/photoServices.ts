import { Photo } from "../models/Photo";

const API_URL = import.meta.env.VITE_API_URL3+"/photo"||"";

// Get all products
export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Get product by ID
export const getPhotoById = async (id: string): Promise<Photo | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create new product
export const createPhoto = async (Photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Photo),
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update product
export const updatePhoto = async (id: string, photo: Partial<Photo>): Promise<Photo | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete product
export const deletePhoto = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar producto");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};