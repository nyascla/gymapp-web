import { API_URL } from "./config"


export async function getToken(username, password) {
    const requestData = new URLSearchParams();
    requestData.append('username', username);
    requestData.append('password', password);

    try {
        const response = await fetch(`${API_URL}/token`, {
            method: 'POST', // Método de la solicitud
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Establece el tipo de contenido como form-urlencoded
            },
            body: requestData // Envía los datos codificados en la solicitud
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Lanza un error si la respuesta no es ok
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        return data;
    } catch (error) {
        console.error('Error fetching token:', error); // Maneja el error
    }
}