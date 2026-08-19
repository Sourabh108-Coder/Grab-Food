import React, { useState } from 'react'
import ExploreMenu from '../Components/ExploreMenu'
import Fooddisplay from '../Components/Fooddisplay'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [category,setcategory]=useState("All");

  const navigate = useNavigate();
  
  return (
    <div className='home-page'>
        <div className='header'>
            <div className='content'>
                <h1 className='head-heading'>Order Your Favourite Food Here</h1>
                <p className='hero-para'>There are so many ways to describe food, including taste, texture, preparation style, <br/>and more. Whether you’re looking to spice up your 
                    food related ooking for the right <br/> words to describe food you’ve eaten or prepared recently,there are plenty of options <br/> to consider.vocabulary..
                </p>

                <a href='#but1'><button className='but1'>View More</button></a>
            </div>
        </div>

        <ExploreMenu category={category} setcategory={setcategory}/>

        <Fooddisplay category={category}/>
    </div>
  )
}

export default Home
