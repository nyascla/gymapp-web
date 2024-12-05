import { API_URL } from "./config"


export async function getHomeInfo(token) {
    try {
        const response = await fetch(`${API_URL}/home_info`, {
            method: 'GET', // El método por defecto para fetch es GET, pero es bueno dejarlo explícito.
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Devuelve los datos obtenidos de la API.
    } catch (error) {
        console.error('Error getLastEntrene:', error);
    }
}