import React from 'react'
import { useEffect,useState } from 'react';

import {toast} from"react-toastify";

import axios from "axios";

const Order = () => {

  const[listdata,setlistdata]=useState([]);


  const fetchallorders=async(req,res)=>
  {
    try
    {
      const res=await axios.get("http://localhost:4000/api/v1/grabfood/listadmin");

      if(res.data.success)
      {
        console.log("hello"+res.data.data);
        setlistdata(res.data.data);
        toast.success("Fetched Successfully");
      }
    }

    catch(error)
    {
      toast.error("Error in Fetching Orders");
    }
  }


  const statushandler=async(event,orderid)=>
  {
     const res=await axios.post("http://localhost:4000/api/v1/grabfood/updatestatus",{orderid,status:event.target.value});

     if(res.data.success)
    {
      await fetchallorders();
    }
    
  }


  useEffect(()=>
  {
    fetchallorders();

  },[])
  return (
    <div className='order add'>
      <h1>All Customers Orders </h1>

      <div className='order-list'>
        {
          listdata.map((order,index)=>(

            <div key={index} className='order-item'>

              <b>Name</b><b>Address</b><b>Email</b><b>Telephone</b><b>Orders</b><b>Price</b><b>Click Here</b>

            
                    <h3 className='order-item-name'>{order.address.firstname +" "+ order.address.lastname}</h3>
                    <h3>{order.address.address}</h3>
                    <h3>{order.address.email}</h3>
                   


                    <h3 className='order-item-phone'>{order.address.telephone}</h3>
              
              <div>
                <h3 className='order-item-food'>
                  {
                    order.items.map((item,index)=>{

                      if(index===order.items.length-1)
                      {
                        return item.name+"*"+  item.quantity
                      }

                      else
                      {
                        return item.name+"*"+item.quantity+",";
                      }
                    })
                  }
                </h3>
                </div>

                {/* <div className='order-address'>

                  <b>FirstName</b><b>LastName</b><b>Address</b><b>Email</b><b>Zip-Code</b><b>Telephone</b>
                    <p className='order-item-name'>{order.address.firstname}</p>
                    <p className='order-item-name'>{order.address.lastname}</p>
                    <p>{order.address.address+","}</p>
                    <p>{order.address.email}</p>
                    <p>{order.address.zipcode}</p>


                    <p className='order-item-phone'>{order.address.telephone}</p>
              </div> */}
              

             
              <h3>${order.amount}</h3>

              <select onChange={(event)=>statushandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>

            

            
          ))

          
        }
      </div>
    </div>
  )
}

export default Order
