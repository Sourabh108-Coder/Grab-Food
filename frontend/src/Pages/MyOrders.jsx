import React, { useContext, useEffect, useState } from 'react'
import { Storecontext } from '../Context/Storecontext';
import axios from 'axios';

import { IoFastFoodSharp } from "react-icons/io5";

const MyOrders = () => {

    const[userorders,setuserorders]=useState([]);

    const{token}=useContext(Storecontext);

    const fetchuserorders=async()=>
    {
        
        try
        {
            const res=await axios.post("http://localhost:4000/api/v1/grabfood/listorder",{},{headers:{token}});

            setuserorders(res.data.data);

            console.log(res.data.data);
        }

        catch(error)
        {
            console.log("Error in Fetching"+error);
        }
    }

    useEffect(()=>
    {
        if(token)
        {
            fetchuserorders();
        }
    },[token])

  return (
    <div className='myorders'>

        <h1 className='lsthead'>My Orders <IoFastFoodSharp /></h1>

        <div className='container'>
            {
                userorders.map((order,index)=>{

                    return(

                        <div key={index} className=' lstdiv'>

                            <img src='https://media1.giphy.com/media/X9wdHtZzVFAjJ1QgmZ/giphy.gif' className='lstgif'/>
                            <p>{order.items.map((item,index)=>{
                                
                                if(index==order.items.length-1)
                                {
                                    return item.name +" " + "x" +" "+ item.quantity
                                }

                                else
                                {
                                    return item.name  +" " + "x" +" "+ item.quantity + "," 
                                }
                            })}</p>

                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p>🍕{order.status}</p>

                            <button className='tr-but' onClick={fetchuserorders}><b>Track Order</b></button>

                        </div>
                    )
                })
            }
        </div>
     
    </div>
  )
}

export default MyOrders
