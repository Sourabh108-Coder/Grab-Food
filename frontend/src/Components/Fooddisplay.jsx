import React, { useContext } from 'react'
import { Storecontext } from '../Context/Storecontext';
import Fooditem from './Fooditem';


const Fooddisplay = ({category}) => {

  const{food_list}=useContext(Storecontext);

  return (
    <div className='food-disp' id="food-disp">

        <h2 className='top'>Top Dishes Near You</h2>

        <div className='food-display-list'>
          {
            food_list.map((item,index)=>
            {
              if(category==="All" || item.category===category)
              {
                // console.log(item._id);
                return<Fooditem id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} key={index}/>
              }
            }
            )
          }
        </div>

      
    </div>
  )
}

export default Fooddisplay
