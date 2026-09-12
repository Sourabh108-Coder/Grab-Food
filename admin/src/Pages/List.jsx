import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = "http://localhost:4000";

  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v1/grabfood/list`
      );

      setList(response.data.data);

    } catch (error) {
      toast.error("Error in Listing");
    }
  };

  const removefood = async (foodid) => {
    try {

      const res = await axios.post(
        `${url}/api/v1/grabfood/remove`,
        { Id: foodid }
      );

      toast.success("Item Removed Successfully");

      await fetchlist();

    } catch (error) {
      toast.error("Error in Removal of Item");

    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="list-page">

      {/* ================= HEADER ================= */}

      <div className="list-header">

        <div>
          <h1>Food List</h1>

          <p>
            Manage all the food items available in your menu.
          </p>
        </div>

        <div className="list-count">
          <span>{list.length}</span>
          <small>Food Items</small>
        </div>

      </div>


      {/* ================= TABLE CARD ================= */}

      <div className="list-card">

        {/* TABLE HEADER */}

        <div className="list-table-header">

          <div>Food</div>
          <div>Name</div>
          <div>Price</div>
          <div>Category</div>
          <div>Action</div>

        </div>


        {/* ================= FOOD LIST ================= */}

        {list.length > 0 ? (

          <div className="food-list">

            {list.map((item) => (

              <div
                className="food-row"
                key={item._id}
              >

                {/* IMAGE */}

                <div className="food-image-container">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-list-image"
                  />

                </div>


                {/* NAME */}

                <div className="food-name">

                  <h3>{item.name}</h3>

                  <span>Food Item</span>

                </div>


                {/* PRICE */}

                <div className="food-price">

                  ₹{item.price}

                </div>


                {/* CATEGORY */}

                <div>

                  <span className="category-badge">
                    {item.category}
                  </span>

                </div>


                {/* ACTION */}

                <div>

                  <button
                    className="delete-button"
                    onClick={() => removefood(item._id)}
                    title="Delete food"
                  >

                    <span className="delete-icon">
                      🗑
                    </span>

                    <span className="delete-text">
                      Delete
                    </span>

                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="empty-list">

            <div className="empty-icon">
              🍽️
            </div>

            <h2>No Food Items Found</h2>

            <p>
              You haven't added any food items to your menu yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default List;