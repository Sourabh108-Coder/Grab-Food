import React , { useContext, useEffect, useState } from 'react'
import { Storecontext } from '../Context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

    const{getcarttotalamount,token,food_list,cartitem,setcartitem}=useContext(Storecontext);

    const navigate= useNavigate();

    const[data,setdata]=useState({
      firstname:"",
      lastname:"",
      email:"",
      address:"",
      telephone:"",
      zipcode:"",
    })

    const onchangehandler=(event)=>
   {
      const{name,value}=event.target;

      setdata((prev)=>{
         return{
            ...prev,
            [name]:value,
         }
      })
   }

   
   const placeorder=async(event)=>
   {
      event.preventDefault();

      let orderItems=[];

      food_list.map((item)=>
      {
         if(cartitem[item._id]>0)
         {
            let itemInfo=item;
            itemInfo["quantity"]=cartitem[item._id];
            orderItems.push(itemInfo);
         }
      })

      console.log(orderItems);

      let orderdata={
         address:data,
         items:orderItems,
         amount:getcarttotalamount()+20,
      }

     /*try
     {
         let res=await axios.post("http://localhost:4000/api/v1/grabfood/orderfood",orderdata,{headers:{token}});

         if(res.data.success)
         {
             const{data}=res.data;
             window.location.replace(data);
         }
     }*/

         try {
            // Send order data to backend
            let res = await axios.post("http://localhost:4000/api/v1/grabfood/orderfood", orderdata, {
                headers: { token }
            });

            if (res.data.success) {
                const { data } = res.data;

                // Razorpay order details received from the backend
                const { orderId, amount, currency ,newid} = data;

                // Set up Razorpay payment options
                const options = {
                    key: "rzp_test_xWuAjh4qFAuptt", // Your Razorpay Key ID
                    amount: amount, // Amount in paise (multiply by 100)
                    currency: currency, // Currency type
                    name: 'Grab Food', // Name of your company
                    description: 'Order Payment',
                    image: 'https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180', // Your logo URL
                    order_id: orderId, // Razorpay Order ID from backend
                    handler: async function (response) {
                        // Handle successful payment
                        console.log(response);
                        alert("Payment Successful!");

                        const val=await axios.post("http://localhost:4000/api/v1/grabfood/verify",{orderid:newid,success:"true"});
                        console.log("hello"+val);
                        // Send the payment details to the backend to verify payment
                        // Call your backend API to confirm the payment and mark the order as paid

                        if(val.data.success)
                        {
                           setcartitem({})
                           navigate("/myorders");
                        }

                        else
                        {
                           navigate("/");
                        }
                    },
                    prefill: {
                        name: data.firstname + ' ' + data.lastname,
                        email: data.email,
                        contact: data.telephone,
                    },
                    notes: {
                        address: data.address,
                    },
                    theme: {
                        color: "#F37254", // Your theme color
                    },
                };

                // Initialize Razorpay checkout
                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            }
        }  

     catch(error)
     {
      alert("Error in placing order");
     }
   }


   useEffect(()=>{

      if(!token)
      {
         toast.error("Please Login to access functionality!");
         navigate("/cart");
      }

      else if(getcarttotalamount()===0)
      {
         toast.info("Please fill the cart first!");
         navigate("/cart");
      }
   },[token])

  return (
    <form className='pay-form' onSubmit={placeorder}>

       <div className='lefty'>
           <h1>Delivery Information</h1>
           <div className='multi'>
              <input type='text'required placeholder='First-Name' className='inputpay-field' name="firstname" onChange={onchangehandler} value={data.firstname}/>
              <input type='text'required placeholder='Last-Name' className='inputpay-field' name="lastname" onChange={onchangehandler} value={data.lastname}/>
           </div>

           <input type="email"required  placeholder='Email' className='inputemail-field' name="email" onChange={onchangehandler} value={data.email}/>
           <input type='text' required placeholder='Full-Address' className='inputemail-field' name="address" onChange={onchangehandler} value={data.address}/>

           <div className='multi'>
              <input type='tel' required placeholder='Telephone'className='inputpay-field' name="telephone" onChange={onchangehandler} value={data.telephone}/>
              <input type="text" required placeholder='Zip Code'className='inputpay-field' name="zipcode" onChange={onchangehandler} value={data.zipcode}/>
          </div>

       </div>

       <div className='righty'>
          <div className='priciny'>
             <div className='left1'>
                <h2>Cart Totals</h2>
        
               <div className='totling1'>
                  <p>Sub-Total</p>
                  <p>{getcarttotalamount()}</p>
               </div>
        
              <div className='totling1'>
                <p>Delivery Fee</p>
               <p>${getcarttotalamount()>0? 20 :0}</p>
              </div>
        
             <div className='totling1'>
                <p>Total</p>
               <p>{getcarttotalamount()>0?getcarttotalamount()+20:0}</p>
            </div>
     

           <button type='submit' className='hello'>Proceed To Pay</button>
          </div>
        </div>
       </div>


        
    </form>
  )
}

export default PlaceOrder
