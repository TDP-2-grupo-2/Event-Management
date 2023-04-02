import React , {useState} from 'react';
import {FaBeer, FaBars} from 'react-icons/fa'

import {AiOutlineHome} from 'react-icons/ai'

import {BsGraphUp, BsGear}from 'react-icons/bs'

import {BiCalendarEvent} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import classes from '../App.css'

export const Sidebar = () => {
    
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem = [
        {
            path: "/MyEvents",
            name: "MyEvents",
            description: "Mis eventos",
            icon: <AiOutlineHome/>
        },
        {
            path: "/CreateEvent",
            name: "CreateEvent",
            description: "Crear evento",
            icon: <BiCalendarEvent/>
        },
        {
            path: "/Metrics",
            name: "Metrics",
            description: "Metricas",
            icon: <BsGraphUp/>
        },
    ]

    return (
        <div className='container'>
            <div style={{width: isOpen ? "280px" : "50px"}} className='sidebar'>
                <div className='top_section'>
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Event Management</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
                        <FaBars onClick={toggle}/>
                    </div>
                </div >
                {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.description}</div>
                       </NavLink>
                   ))
               }
            </div>
        </div>
    )
}
