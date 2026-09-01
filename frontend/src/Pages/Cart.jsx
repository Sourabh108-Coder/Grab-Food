import React, { useContext, useEffect } from 'react'
import { Storecontext } from '../Context/Storecontext';
import { MdDeleteForever } from "react-icons/md";
import { MdWhereToVote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const Cart = () => {

  const{food_list,addtocart,removecart,cartitem,getcarttotalamount,token}=useContext(Storecontext);
  const navigate=useNavigate();

   // Check whether cart has at least one item
  const isCartEmpty = !food_list.some((item) => cartitem[item._id] > 0);

  useEffect(()=>{
  
    if(!token)
    {
        toast.error("Please Login to access functionality!");
        navigate("/");
    }
  },[token])

  return (
   <div className='cart'>
    <div className='linecart'></div>

    {isCartEmpty ? ( 

          <div className="empty-cart">
            <img
              src="https://www.herbsandmore.shop/img/Cart.gif"
              alt="Cart is empty"
              className="empty-cart-gif"
            />
            <h2>Your Cart is Empty</h2>
            <p>Add some delicious food to your cart!</p>

            <button onClick={() => navigate("/")}>
              Go To Home
            </button>
        </div>) :(
    

    
    <>

    <div className="mobile-scroll-hint">
      ← Swipe to see more →
    </div>

    <div className="cart-table-scroll">

     <div className='class-item'>
      
      <p>Image</p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>
    </div>

    
    
      {
        food_list.map((item)=>{

          if(cartitem[item._id]>0)
          {
            return(
             <div>
               <div className='class-items'>
                <img src={item.image} className="cart-img"/>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartitem[item._id]}</p>
                <p>${cartitem[item._id]*item.price}</p>
                <p><MdDeleteForever onClick={()=>removecart(item._id)}className='cartdelete'/></p>
              </div>

              <hr/>
             </div>

              
              
            )
          }

        })
      } 

      </div>


    

      <div className='pricing'>
        <div className='left'>
          <h2>Cart Totals</h2>
        
          <div className='totling'>
            <p>Sub-Total</p>
            <p>{getcarttotalamount()}</p>
          </div>
        
          <div className='totling'>
            <p>Delivery Fee</p>
            <p>${getcarttotalamount()>0? 20 :0}</p>
          </div>
        
          <div className='totling'>
            <p>Total</p>
            <p>{getcarttotalamount()>0?getcarttotalamount()+20:0}</p>
          </div>
     

          <button className='pay-but'onClick={()=>navigate("/order")}>Proceed To Checkout</button>
        </div>

        <div className='right'>
          <h3 className='pay-para'>If you have a Promo Code <br/>Enter Here <MdWhereToVote /></h3>
          <h3 className='pay-para-copy'>Enter Promo Code Here. If any ? </h3>
          <input type="text" placeholder='Enter Code' className='input-field'/>
          <button className='sub-but'>Submit</button>
        </div>
      </div>
      </> )}
      
  
   </div>
    
  )
}

export default Cart
