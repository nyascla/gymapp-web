import React from 'react';

import VolumePanel from '../src/components/volumepanel/VolumePanel'
import ExercisePanel from './components/exercisepanel/ExercisePanel'

import './App.css'


function App() {

  return (
    <div className='app'>
      <VolumePanel />
      <ExercisePanel />
    </div>
  );
}

export default App;
