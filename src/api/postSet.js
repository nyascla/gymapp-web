import { API_URL } from "./config"


export async function postSet(requestData, token) {
    const requestDataExample = {
        session_id: "4c0597b2-bc89-4a60-bbb8-dfcb20005f0c",
        exercise_name: "Dumbbells Press",
        weight: "100",
        repetitions: "2",
        rir: "1"
    };

    try {
        const response = await fetch(`${API_URL}/set`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating set:', error); // Maneja el error
    }
}