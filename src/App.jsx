import React, { useState, useEffect } from 'react';
import Entreno from '../src/components/entreno/Entreno'
import Volumen from '../src/components/volumen/Volumen'

import EjercicioSelect from './components/EjercicioSelect/EjercicioSelect'



import './App.css'

function App() {



  return (
    <div className='app'>
      {/* <Entreno/> */}
      <Volumen/>


      <EjercicioSelect/>

      
      <Entreno/>

    </div>
  );
}

export default App;
