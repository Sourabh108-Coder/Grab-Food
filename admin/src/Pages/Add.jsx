import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiImage, FiTag, FiFileText, FiDollarSign } from "react-icons/fi";

const Add = () => {

  const url = "http://localhost:4000";

  const [adddata, setadddata] = useState(
    {
      image: "",
      name: "",
      description: "",
      price: "",
      category: "Salad",
    }
  );

  function changeHandler(event) {
    const { name, value } = event.target;

    setadddata((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }


  async function submithandler(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/v1/grabfood/addfood`,
        adddata
      );

      toast.success("Data Inserted Success-Fully")
    }

    catch (error) {
      toast.error("Error in Insertion")
    }
  }


  return (
    <div className="addfunc">

      <div className="add-container">

        {/* Page Header */}
        <div className="add-header">
          <div>
            <h1>Add New Item</h1>
          </div>
        </div>


        <div className="add-content">

          {/* Form Card */}
          <form className="addform" onSubmit={submithandler}>

            {/* Image URL */}
            <div className="form-group">

              <label htmlFor="Url">
                <FiImage />
                Image URL
              </label>

              <input
                type="url"
                id="Url"
                name="image"
                onChange={changeHandler}
                value={adddata.image}
                placeholder="https://example.com/food-image.jpg"
                className="add-input"
              />

            </div>


            {/* Product Name */}
            <div className="form-group">

              <label htmlFor="p-name">
                <FiTag />
                Product Name
              </label>

              <input
                type="text"
                id="p-name"
                name="name"
                onChange={changeHandler}
                value={adddata.name}
                placeholder="Enter product name"
                className="add-input"
              />

            </div>


            {/* Description */}
            <div className="form-group">

              <label htmlFor="txt-area">
                <FiFileText />
                Product Description
              </label>

              <textarea
                id="txt-area"
                name="description"
                onChange={changeHandler}
                value={adddata.description}
                placeholder="Write a short description of your product..."
                className="add-inputtext"
              />

            </div>


            {/* Category + Price */}
            <div className="twocomp">

              <div className="comp1">

                <label htmlFor="selector1">
                  Category
                </label>

                <select
                  name="category"
                  id="selector1"
                  onChange={changeHandler}
                  value={adddata.category}
                  className="sel"
                >
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


              <div className="comp1">

                <label htmlFor="Pri-num">
                  <FiDollarSign />
                  Price
                </label>

                <input
                  type="number"
                  id="Pri-num"
                  name="price"
                  onChange={changeHandler}
                  value={adddata.price}
                  placeholder="0"
                  className="add-input1"
                />

              </div>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="animated-button1"
              id="addbut"
            >
              Add Item
            </button>

          </form>


          {/* Right Preview */}
          <div className="food-preview">

            <div className="preview-card">

              <div className="preview-icon">
                <FiImage />
              </div>

              <h2>Ready to add?</h2>

              <p>
                Fill in the details and add your delicious
                food item to the menu.
              </p>

              <img
                src="https://media.giphy.com/media/3oKIPdQyoFG3RSSOL6/giphy.gif"
                className="foodgif"
                alt="Food animation"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Add
