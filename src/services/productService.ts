import { Product } from "../models/Product";

const API_URL = import.meta.env.VITE_API_URL3+"/products"||"";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
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
export const getProductById = async (id: string): Promise<Product | null> => {
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
export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete product
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar producto");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};