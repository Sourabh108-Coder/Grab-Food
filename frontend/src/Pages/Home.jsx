import React, { useState } from 'react'
import ExploreMenu from '../Components/ExploreMenu'
import Fooddisplay from '../Components/Fooddisplay'

const Home = () => {

  const [category,setcategory]=useState("All");
  
  return (
    <div className='home-page'>
        <div className='header'>
            <div className='content'>
                <h1 className='head-heading'>Order Your Favourite Food Here</h1>
                <p>There are so many ways to describe food, including taste, texture, preparation style, <br/>and more. Whether you’re looking to spice up your 
                    food related ooking for the right <br/> words to describe food you’ve eaten or prepared recently,there are plenty of options <br/> to consider.vocabulary..
                </p>

                <button className='but1'>View More</button>
            </div>
        </div>

        <ExploreMenu category={category} setcategory={setcategory}/>

        <Fooddisplay category={category}/>
    </div>
  )
}

export default Home
