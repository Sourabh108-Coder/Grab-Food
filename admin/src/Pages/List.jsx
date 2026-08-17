import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url="http://localhost:4000";

  const[list,setlist]=useState([]);

  const fetchlist=async ()=>
  {
     try
     {
      const response= await axios.get(`${url}/api/v1/grabfood/list`);
      console.log(response.data.data);
      toast.success("Listed Success-Fully");

      setlist(response.data.data);

     }
     
     catch(error)
     {
      console.log("Error Occured"+error);
      toast.info("Error in Listing");
     }

  }

  const removefood=async(foodid)=>
  {
    try {
      
      const res=await axios.post(`${url}/api/v1/grabfood/remove`,{Id:foodid});
      console.log(res.data);

      toast.success("Item Removed Success-Fully");

      await fetchlist();
    } 
    catch (error) {
      toast.error("Error in Removal of item")
    }
  }

  useEffect(()=>
    {
      fetchlist();
    },[])
  
  return (
    <div className='listi'>
     <h1 className='list-head'>All Food List</h1>

     {/* <div>
      <b>Image</b>
      <b>Name</b>
      <b>Price</b>
      <b>Category</b>
      <b>Action</b>
     </div> */}

     <div className='list-table-format title'>

               <b>Image</b>
               <b>Name</b>
               <b>Price</b>
               <b>Category</b>
               <b>Action</b>
      </div>


               {/* <div className='list-table-format1 title' >

                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>


                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>

                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>

                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>


                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>


                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>

                      <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='listi-img'/>
                      <p>Dosa</p>
                      <p>50</p>
                      <p>Chinese</p>
                      <p>X</p>

                     
              </div> */}


      {
        list.map((item,index)=>{
          return(
            <div className='list-table-format1 title' >

              <img src={item.image} className='listi-img'/>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
              <p className='cross' onClick={() => removefood(item._id)}>X</p>
            </div>
          )
        })
      }
     
     </div>
   
  )
}

export default List
