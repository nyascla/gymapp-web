import React, { createContext, useContext, useState, useEffect } from "react";

import { fetchExercises } from "../api/getExercises"


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [session, setSession] = useState()
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState(null);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                const e = await fetchExercises();
                setExercises(e);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        asyncWrapper();

    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        console.log('storedToken:', storedToken);
        setToken(storedToken)
    }, []);

    return (
        <AppContext.Provider value={{ token, setToken, session, setSession, exercises, exercise, setExercise, reload, setReload }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook para usar el contexto más fácilmente
export const useAppContext = () => useContext(AppContext);