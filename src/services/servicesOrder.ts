import { Order } from "../models/Order";
const API_URL = import.meta.env.VITE_API_URL_Permission+"/order"||""; // Reemplaza con la URL real
export const getOrder = async (): Promise<Order[]> => {
    // console.log("aqui "+API_URL)
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener Order");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
