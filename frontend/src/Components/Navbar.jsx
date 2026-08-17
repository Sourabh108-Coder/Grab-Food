import React, { useContext, useState } from 'react'
import { ImSearch } from "react-icons/im";
import { FaBasketShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Storecontext } from '../Context/Storecontext';
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { GiFoodTruck } from "react-icons/gi";

const Navbar = ({showlogin}) => {

    const[menu,setmenu]=useState("Home");

    const{getcarttotalamount}=useContext(Storecontext);

    const Navigate=useNavigate();

    const{token,settoken}=useContext(Storecontext);

    const [isOpen, setIsOpen] = useState(false);

    const navigate=useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

    const logout=()=>
    {
        localStorage.removeItem("token");
        settoken("");
        Navigate("/");
    }

    
  return (
    <div className='Navu'>
        <Link to="/"><img src="https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180" className='logo2'/></Link>

        <ul className='Navbar-menu'>
            <Link to='/' className={menu=="Home"?"active":""} onClick={()=>setmenu("Home")}>Home</Link>
            <a href="#but1" className={menu=="Menu"?"active":""} onClick={()=>setmenu("Menu")}>Menu</a>
            <a href="#but2" className={menu=="Mobile"?"active":""} onClick={()=>setmenu("Mobile")}>Mobile-App</a>
            <a href="#but3" className={menu=="Contact"?"active":""} onClick={()=>setmenu("Contact")}>Contact Us</a>
        </ul>

        <div className='navbar-right'>
            <div><ImSearch className='search'/></div>

            <div>
                <Link to="/cart"><FaBasketShopping className='basket'/></Link>
                <div className={getcarttotalamount()>0?'dot':''}></div>
            </div>

            {
                !token?  <button className='but' onClick={()=>showlogin(true)}>Sign in</button>:
                <div className='profile'>
                    <BsPersonCircle className='basket1' onClick={toggleDropdown}/>
                    <ul className={`profile-dropdown ${isOpen ? 'show' : ''}`}>
                        <li onClick={()=>navigate("/myorders")}><GiFoodTruck className='basket1'/><p>Orders</p></li>
                        <hr/>
                        <li onClick={logout}><IoMdLogOut className='basket1'/><p>LogOut</p></li>
                    </ul>
                </div>
            }

        {/* <button className='but' onClick={()=>showlogin(true)}>Sign in</button> */}


        {/* <div className='profile'>
                    <BsPersonCircle className='basket1' onClick={toggleDropdown}/>
                    <ul className={`profile-dropdown ${isOpen ? 'show' : ''}`}>
                        <li><GiFoodTruck className='basket1'/><p>Orders</p></li>
                        <hr/>
                        <li onClick={logout}><IoMdLogOut className='basket1'/><p>LogOut</p></li>
                    </ul>
                </div> */}
        </div>
       
    </div>
  )
}

export default Navbar
