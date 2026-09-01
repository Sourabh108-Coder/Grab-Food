import React, { useContext, useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { FaBasketShopping } from "react-icons/fa6";
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { Storecontext } from '../Context/Storecontext';
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { GiFoodTruck } from "react-icons/gi";
import { FaMobileScreen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";


const Navbar = ({ showlogin }) => {

    const [menu, setmenu] = useState("Home");
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const {
        getcarttotalamount,
        token,
        settoken
    } = useContext(Storecontext);

    const navigate = useNavigate();
    const location = useLocation();

    const goToSection = (sectionId, menuName) => {
        setmenu(menuName);
        setMobileMenuOpen(false);

        if (location.pathname !== "/") {
            navigate("/", {
                state: {
                    scrollTo: sectionId
                }
            });
        } else {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
       if (location.state?.scrollTo) {
           setTimeout(() => {
               document
                   .getElementById(location.state.scrollTo)
                   ?.scrollIntoView({
                       behavior: "smooth"
                   });
           }, 100);
       }
   }, [location]);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        navigate("/");
        setMobileMenuOpen(false);
        window.location.reload();
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="Navu">

            {/* Logo */}
            <Link to="/">
                <img
                    src="https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180"
                    className="logo-navu"
                    alt="Logo"
                />
            </Link>


            {/* Desktop Menu */}
            <ul className="Navbar-menu">

                <Link
                    to="/"
                    className={menu === "Home" ? "active" : ""}
                    onClick={() => setmenu("Home")}
                >
                    Home
                </Link>

                <a
                    href="#but1"
                    className={menu === "Menu" ? "active" : ""}
                    onClick={() => goToSection("but1", "Menu")}
                >
                    Menu
                </a>

                <a
                    href="#but2"
                    className={menu === "Mobile" ? "active" : ""}
                    onClick={() => goToSection("but2", "Mobile")}
                >
                    Mobile-App
                </a>

                <a
                    href="#but3"
                    className={menu === "Contact" ? "active" : ""}
                    onClick={() => goToSection("but3", "Contact")}
                >
                    Contact Us
                </a>

            </ul>


            {/* Desktop Right Side */}
            <div className="navbar-right">

                {/* Search */}
                <div>
                    <ImSearch className="search" />
                </div>


                {/* Cart */}
                <div className="cart-icon">

                    <Link to="/cart">
                        <FaBasketShopping className="basket" />
                    </Link>

                    <div
                        className={
                            getcarttotalamount() > 0 ? "dot" : ""
                        }
                    ></div>

                </div>


                {/* Profile / Sign In */}
                {!token ? (

                    <button
                        className="but"
                        onClick={() => showlogin(true)}
                    >
                        Sign in
                    </button>

                ) : (

                    <div className="profile">

                        <BsPersonCircle
                            className="basket1"
                            onClick={toggleDropdown}
                        />

                        <ul
                            className={`profile-dropdown ${
                                isOpen ? "show" : ""
                            }`}
                        >

                            <li onClick={() => navigate("/myorders")}>
                                <GiFoodTruck className="basket1" />
                                <p>Orders</p>
                            </li>

                            <hr />

                            <li onClick={logout}>
                                <IoMdLogOut className="basket1" />
                                <p>LogOut</p>
                            </li>

                        </ul>

                    </div>
                )}

            </div>


            {/* Mobile Hamburger */}
            <div
                className="mobile-menu-icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? "✕" : "☰"}
            </div>


            {/* ================= MOBILE MENU ================= */}

            <div
                className={`mobile-navbar ${
                    mobileMenuOpen ? "mobile-show" : ""
                }`}
            >

                {/* Search */}
                <div
                    className="mobile-nav-item"
                    onClick={closeMobileMenu}
                >
                    <ImSearch className="mobile-nav-icon" />
                    <span>Search</span>
                </div>


                {/* Cart */}
                <Link
                    to="/cart"
                    className="mobile-nav-item"
                    onClick={closeMobileMenu}
                >
                    <div className="mobile-cart-icon">

                        <FaBasketShopping className="mobile-nav-icon" />

                        {getcarttotalamount() > 0 && (
                            <span className="mobile-cart-dot"></span>
                        )}

                    </div>

                    <span>Cart</span>
                </Link>


                {/* Profile */}
                {!token ? (

                    <div
                        className="mobile-nav-item"
                        onClick={() => {
                            showlogin(true);
                            closeMobileMenu();
                        }}
                    >
                        <BsPersonCircle className="mobile-nav-icon" />
                        <span>Sign In</span>
                    </div>

                ) : (

                    <>
                        {/* Profile */}
                        <div
                            className="mobile-nav-item"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <BsPersonCircle className="mobile-nav-icon" />
                            <span>Profile</span>
                        </div>

                        {isOpen && (
                            <div className="mobile-profile-options">

                                <div
                                    className="mobile-nav-item"
                                    onClick={() => {
                                        navigate("/myorders");
                                        closeMobileMenu();
                                    }}
                                >
                                    <GiFoodTruck className="mobile-nav-icon" />
                                    <span>Orders</span>
                                </div>

                                <div
                                    className="mobile-nav-item"
                                    onClick={logout}
                                >
                                    <IoMdLogOut className="mobile-nav-icon" />
                                    <span>Logout</span>
                                </div>

                            </div>
                        )}
                    </>

                )}


                {/* Home */}
                <Link
                    to="/"
                    className={`mobile-nav-item ${
                        menu === "Home" ? "active" : ""
                    }`}
                    onClick={() => {
                        setmenu("Home");
                        closeMobileMenu();
                    }}
                >
                    <span className='nav-span'><FaHome className="mobile-nav-icon"/>  Home</span>
                </Link>


                {/* Menu */}
                <a
                    href="#but1"
                    className={`mobile-nav-item ${
                        menu === "Menu" ? "active" : ""
                    }`}
                   onClick={() => goToSection("but1", "Menu")}
                >
                    <span className='nav-span'><MdRestaurantMenu className="mobile-nav-icon"/> Menu</span>
                </a>


                {/* Mobile App */}
                <a
                    href="#but2"
                    className={`mobile-nav-item ${
                        menu === "Mobile" ? "active" : ""
                    }`}
                    onClick={() => goToSection("but2", "Mobile")}
                >
                    <span className='nav-span'><FaMobileScreen className="mobile-nav-icon"/> Mobile-App</span>
                </a>


                {/* Contact */}
                <a
                    href="#but3"
                    className={`mobile-nav-item ${
                        menu === "Contact" ? "active" : ""
                    }`}
                    onClick={() => goToSection("but3", "Contact")}
                >
                    <span className='nav-span'><FaPhoneAlt /> Contact Us</span>
                </a>

            </div>

        </div>
    );
};

export default Navbar;