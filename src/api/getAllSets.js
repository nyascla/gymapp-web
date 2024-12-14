import { API_URL } from "./config"


export async function getAllSets(token, exercise) {
    try {
        const response = await fetch(`${API_URL}/get_all_sets/${encodeURIComponent(exercise)}/`, {
            method: 'GET', // El método por defecto para fetch es GET.
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token de autorización.
                'Content-Type': 'application/json', // Ajusta el Content-Type según lo que tu API espera.
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Devuelve los datos obtenidos de la API.
    } catch (error) {
        console.error('Error fetching sets:', error);
    }
}