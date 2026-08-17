import React from 'react'
import data from '../data'

const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='but1'>
      <h1 className='explor-head'>Explore our Menu</h1>
      <p className='explor-para'>Whether you’re just starting out or considering a rebrand, a well-thought-out restaurant menu design can go a long way
         to improving your bottom line.
      </p>

      <div className='explor-dish'>
        {
            data.map((d1,index)=>{
                return (
                    <div onClick={()=>setcategory((prev)=>prev===d1.menu_name? "All":d1.menu_name)} key={index}>
                        <img src={d1.menu_image} className='dish-img'/>
                        <p className='dish-name'>{d1.menu_name}</p>
                    </div>
                )
            })
        }
      </div>

      <div className='line'></div>
    </div>
  )
}

export default ExploreMenu
