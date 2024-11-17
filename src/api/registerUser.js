import {API_URL} from "./config"


export async function registerUser(username, password) {
    const requestData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
            },
            body: JSON.stringify(requestData) // Convierte el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Lanza un error si la respuesta no es ok
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        return data; // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error('Error registering user:', error); // Maneja el error
    }
}