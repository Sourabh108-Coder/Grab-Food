import React, {  useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

  const url="http://localhost:4000";

  const[adddata,setadddata]=useState(
    {
      image:"",
      name:"",
      description:"",
      price:"",
      category:"Salad",
    }
  );

  function changeHandler(event)
  {
    const {name,value}=event.target;

   setadddata((prev)=>
  {
    return{
      ...prev,
      [name]:value,
    }
  })
  }


async function submithandler(event)
{
  event.preventDefault();


  try
  {
    console.log(adddata);

    const response=await axios.post(`${url}/api/v1/grabfood/addfood`,adddata);
    console.log(response);
    console.log("Data entered successfully");

    toast.success("Data Inserted Success-Fully")
  }
  
  catch(error)
  {
    console.log("Error in data insertion"+error);

    toast.error("Error in Insertion")
  }

}
  

  return (
    <div className='addfunc'>
     <form className='addform' onSubmit={submithandler}>

      <label for="Url">Upload Image</label>
      <input type='url' id="Url"  name="image" onChange={changeHandler} value={adddata.image} placeholder='Enter the url of the image' className='add-input'/>

      <label for="p-name">Product-Name</label>
      <input type="text" id="p-name" name='name'  onChange={changeHandler} value={adddata.name} placeholder="Type Here" className='add-input'/>

      <label for="txt-area">Product-Description</label>
      <textarea id="txt-area" name="description"  onChange={changeHandler} value={adddata.description} placeholder='Write your content here' className='add-inputtext'/>

      <div className='twocomp'>

        <div className='comp1'>
        <label for="selector1">Product-Category</label>
        <select name="category" id='selector1'  onChange={changeHandler} value={adddata.category} className='sel'>
          <option value="Salad">Salad</option>
          <option value="Roll">Roll</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
          <option value="Momos">Momos</option>
          <option value="Cake">Cake</option>
          <option value="Noodles">Noodles</option>
        </select>

        </div>
        
        <div className='comp1'>
        <label for="Pri-num">Product Price</label>
        <input type='number' name='price'  onChange={changeHandler} value={adddata.price} className='add-input1'></input>
        </div>
      </div>

      <button className='animated-button1' id='addbut'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
        Add</button>


     </form>

     <img src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif" className='foodgif'/>
    </div>
  )
}

export default Add
