import React from "react";

import './Gym.css'

const plantilla = {
"pb": {"s": 3,
       "r": 10,
       "rir": 1
      },
"pbI":{"s": 3,
      "r": 10,
      "rir": 1
      },
"a":{},
"b":{},
"c":{},
"d":{},
"e":{},
"f":{},

}

export const Gym = (props) => {
  
  return ( 
    <>   
      {Object.keys(plantilla).map(code => (
        <div>
          <GymTemplate code={code}/>
        </div>
      ))}
    </>
  )
}

const GymTemplate = (props) =>{
  const {code} = props
  return (
    <div className="lyGymTemplate">
      <h3>## {code} ##</h3>
      <h4>El entreno anterior</h4>
      <input>
      </input>
      <button>Enviar</button>
    </div>
  )
}



