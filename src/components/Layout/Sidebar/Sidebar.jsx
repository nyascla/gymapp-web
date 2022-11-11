import React from "react";

import './Sidebar.css'

const list = 
{
 "Gym":"",
 "Food":"",
 "Weight":"",
}
export const Sidebar = (props) => {
    const {isOpen, setIsOpen} = props
    const {page, setPage} = props

    async function onClickListElement(e, key){
        e.preventDefault()
        setPage(key)
        setIsOpen(false)
    }

    return (
        <div className={`sidebar + ${isOpen ? "is-open": ""}`}>
            <div className="sidebar-header">
                <h3 onClick={() => setIsOpen(!isOpen)}> {page} </h3>           
            </div>  
            
            <div>
            {Object.keys(list).map( key => (
                <div
                onClick={(e) => onClickListElement(e, key)}
                key={key}>
                <h2><strong className="">{key}</strong></h2>   
                </div>
            ))}                         
            </div>    
        </div>
    );
}

