import { MotorcycleInfringements } from "../models/MotorcycleInfringement";

const API_URL_GET = import.meta.env.VITE_API_URL_GET;       // GET lista infracciones
const API_URL_POST = import.meta.env.VITE_API_URL_POST;     // POST crear infracción
const API_URL_DELETE_BASE = import.meta.env.VITE_API_URL_DELETE; // DELETE base URL para eliminar por ID

// Obtener todas las infracciones de motocicleta
export const getMotorcycleInfringements = async (): Promise<MotorcycleInfringements[] | null> => {
  try {
    const response = await fetch(API_URL_GET);

    if (!response.ok) {
      throw new Error("Error al obtener infracciones");
    }

    const result: MotorcycleInfringements[] = await response.json();
    return result;
  } catch (error) {
    console.error("Error obteniendo infracciones de motocicleta:", error);
    return null;
  }
};

// Crear una infracción de motocicleta
export const createMotorcycleInfringement = async (
  data: MotorcycleInfringements
): Promise<MotorcycleInfringements | null> => {
  try {
    const response = await fetch(API_URL_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear infracción");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creando infracción de motocicleta:", error);
    return null;
  }
};

// Eliminar una infracción de motocicleta por ID
export const deleteMotorcycleInfringement = async (id: number | string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL_DELETE_BASE}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar infracción");
    }

    return true;
  } catch (error) {
    console.error("Error eliminando infracción de motocicleta:", error);
    return false;
  }
};
