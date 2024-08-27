import React, { useState, useEffect } from 'react';
import ExerciseSelector from './modals/ExerciseSelector'
import ExerciseNewSerie from './modals/ExerciseNewSerie'

import './exercisepanel.css'

function ExercisePanel() {
    const [ejercicio, setEjercicio] = useState('');
    const [isModalSerie, setModalSerie] = useState(false);
    const [isModalEjercicios, setModalEjercicios] = useState(false);

    return (
        <div className="exercise-panel">
            <div className="buttons-panel">
                <div>
                    <button onClick={() => setModalSerie(true)}>Ejercicis</button>
                    <ExerciseSelector
                        isOpen={isModalSerie}
                        onClose={() => setModalSerie(false)}
                    />
                </div>
                
                <div>
                    <button onClick={() => setModalEjercicios(true)}>Crear Serie</button>
                    <ExerciseNewSerie
                        isOpen={isModalEjercicios}
                        onClose={() => setModalEjercicios(false)}
                        setEjercicio={setEjercicio}
                    />
                </div>
            </div>
            
            <div className="selection-panel">
                {/* {ejercicio} */}
                pull_ups
            </div>
            
            <div className="historic-panel">
                historico de un ejercicio
            </div>
        </div>

    );
}

export default ExercisePanel;
