import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiListCheck3 } from "react-icons/ri";
import { GiStorkDelivery } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="side">

      <NavLink to="/" className="same">
        <MdDashboard className="side-icon" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/add" className="same">
        <IoIosAddCircleOutline className="side-icon" />
        <span>Add Items</span>
      </NavLink>

      <NavLink to="/list" className="same">
        <RiListCheck3 className="side-icon" />
        <span>List Items</span>
      </NavLink>

      <NavLink to="/order" className="same">
        <GiStorkDelivery className="side-icon" />
        <span>Orders</span>
      </NavLink>

    </aside>
  );
};

export default Sidebar;
