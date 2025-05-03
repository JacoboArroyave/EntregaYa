import { Issue } from "../models/Issue";

const API_URL = "http://127.0.0.1:5000//issues";

// Get all issues
export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener issues");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Get issue by ID
export const getIssueById = async (id: string): Promise<Issue | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Issue no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create new issue
export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
        });
        if (!response.ok) throw new Error("Error al crear issue");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Update issue
export const updateIssue = async (id: string, issue: Partial<Issue>): Promise<Issue | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
        });
        if (!response.ok) throw new Error("Error al actualizar issue");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Delete issue
export const deleteIssue = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar issue");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
