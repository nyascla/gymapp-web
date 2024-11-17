import { API_URL } from "./config"


export async function getTodaySession(token) {
    try {
        const response = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        return data; // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error('Error creating session:', error); // Maneja el error
    }
}