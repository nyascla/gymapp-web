import './Sidebar.css'

import React, {useContext} from "react";
import Enumerations from '../../../utils/Enumerations';

import { AppContext } from '../../../App'; 

export const Sidebar = (props) => {
    const {isOpen, setIsOpen, page, setPage} = useContext(AppContext);

    async function onClickListElement(e, key){
        setPage(key)
        setIsOpen(false)
    }

    return (
        <div className={`sidebar + ${isOpen ? "is-open": ""}`}>
            <div className="sidebar-header">
                <h1 onClick={() => setIsOpen(!isOpen)}> {page} </h1>           
            </div>  
            
            <div className='content'>
            {Object.keys(Enumerations.pages).map(key => (
                <div className='element'
                    onClick={(e) => onClickListElement(e, key)}
                    key={key}>
                    <h3>{Enumerations.pages[key]}</h3>   
                </div>
            ))}                         
            </div>    
        </div>
    );
}

