import React from "react";

import './Body.css'

import { useEffect } from 'react'
import { useState } from 'react'

import {Gym} from "./Gym/Gym"
import {Food} from "./Food/Food"
import {Weight} from "./Weight/Weight"

export const Body = (props) => {
  const {page} = props
  
  const [renderPage, setRenderPage] = useState(<Gym/>)

  useEffect(() => {   
    switch (page) {
      case 'Gym':
        setRenderPage(<Gym/>)
        break;
      case 'Food':
        setRenderPage(<Food/>)
        break;
      case 'Weight':
        setRenderPage(<Weight/>)
        break;
      default:
        setRenderPage(<Gym/>)
        break; 
    }
  }, [page]); // Only re-run the effect if count changes
  
  return (
    <div className="lyBody">     
      {renderPage}
    </div>
  )
}

