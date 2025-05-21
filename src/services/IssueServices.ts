import { Issue } from "../models/Issue";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/issues";

// Obtener todos los problemas
export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los problemas:", error);
        return [];
    }
};

// Obtener un problema por ID
export const getIssueById = async (id: string): Promise<Issue | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el problema por ID:", error);
        return null;
    }
};

// Crear un nuevo problema
export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await api.post(API_URL, issue);
        return response.data;
    } catch (error) {
        console.error("Error al crear el problema:", error);
        return null;
    }
};

// Actualizar un problema
export const updateIssue = async (id: string, issue: Partial<Omit<Issue, "id">>): Promise<Issue | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, issue);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el problema:", error);
        return null;
    }
};

// Eliminar un problema
export const deleteIssue = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el problema:", error);
        return false;
    }
};
