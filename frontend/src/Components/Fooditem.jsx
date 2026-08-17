import React, { useContext, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Storecontext } from '../Context/Storecontext';


const Fooditem = ({id,name,description,image,price}) => {

  const[count,setcount]=useState(0);

  const{cartitem,setcartitem,addtocart,removecart}=useContext(Storecontext);
  return (
    <div className='food-item-menu'>

      <div>
        <div className='posi'>
        <img src={image} className='item-imge'/>
        {
          !cartitem[id]? <p className='addbut'><IoIosAddCircle onClick={()=>addtocart(id)} className='add-icon'/></p>:
          <div className='posi2'>
            <p className='addbut1'><IoIosAddCircle onClick={()=>addtocart(id)} className='add-icon'/></p>
            <p className='count-para'>{cartitem[id]}</p>
            <p className='delbut'><MdDelete onClick={()=>removecart(id)} className='del-icon'/></p>
          </div>
        }
        </div>
        <p className='food_name'>{name}</p>
        <p>{description}</p>
        <p className='food_price'>${price}</p>
    </div>
      
    </div>
  )
}

export default Fooditem
