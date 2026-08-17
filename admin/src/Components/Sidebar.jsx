import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiListCheck3 } from "react-icons/ri";
import { GiStorkDelivery } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='side'>

      <NavLink to="/add" className='same'>
        <div><IoIosAddCircleOutline className='logo' /></div>
        <p>Add-Items</p>
      </NavLink>

      <NavLink to="/list" className='same'>
        <div><RiListCheck3 className='logo'/></div>
        <p>List-Items</p>
      </NavLink>

      <NavLink to="/order" className='same'>
        <div><GiStorkDelivery className='logo'/></div>
        <p>Order-Item</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
