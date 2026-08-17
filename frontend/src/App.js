import './App.css';
import Navbar from './Components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import { useState } from 'react';
import Login from './Components/Login';
import Cart from './Pages/Cart';
import PlaceOrder from './Components/PlaceOrder';
import MyOrders from './Pages/MyOrders';

function App() {

  const[login,showlogin]=useState(true);

  return (
    <div className="App">

      {
        login? <Login showlogin={showlogin}/>:<></>
      }
      <div className={login?"blureed":""}>
         <Navbar showlogin={showlogin}/>

         <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/cart" element={<Cart/>}/>
             <Route path="/order" element={<PlaceOrder/>}/>
             <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>

       <Footer/>
      </div>
    </div>
  );
}


export default App;
