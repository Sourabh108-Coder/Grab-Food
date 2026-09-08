import React from 'react'
import { useEffect, useState } from 'react';

import { toast } from "react-toastify";

import axios from "axios";

const Order = () => {

  const [listdata, setlistdata] = useState([]);


  const fetchallorders = async (req, res) => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/grabfood/listadmin");

      if (res.data.success) {
        console.log("hello" + res.data.data);
        setlistdata(res.data.data);
        toast.success("Fetched Successfully");
      }
    }

    catch (error) {
      toast.error("Error in Fetching Orders");
    }
  }


  const statushandler = async (event, orderid) => {
    const res = await axios.post(
      "http://localhost:4000/api/v1/grabfood/updatestatus",
      {
        orderid,
        status: event.target.value
      }
    );

    if (res.data.success) {
      await fetchallorders();
    }

  }


  useEffect(() => {
    fetchallorders();

  }, [])


  return (
    <div className='order-page'>

      {/* ================= HEADER ================= */}

      <div className='order-header'>

        <div className='order-heading-content'>

          <div className='order-heading-icon'>
            <span>🛍️</span>
          </div>

          <div>
            <h1>Customer Orders</h1>

            <p>
              Monitor and manage all your customer orders.
            </p>
          </div>

        </div>


        <div className='order-count'>

          <span>{listdata.length}</span>

          <small>Total Orders</small>

        </div>

      </div>


      {/* ================= ORDERS ================= */}

      <div className='order-list'>

        {
          listdata.map((order, index) => {

            const isCancelled = order.Payment === false;

            return (

              <div
                key={index}
                className={`order-item ${isCancelled ? 'cancelled-order' : ''}`}
              >

                {/* ================= CARD HEADER ================= */}

                <div className='order-card-top'>

                  <div className='order-id-section'>

                    <div className='order-icon'>
                      🍽️
                    </div>

                    <div>

                      <span className='order-small-label'>
                        ORDER
                      </span>

                      <strong className='order-number'>
                        #{index + 1}
                      </strong>

                    </div>

                  </div>


                  <div className='order-status-wrapper'>

                    {
                      isCancelled ? (

                        <div className='cancelled-badge'>
                          <span className='cancelled-dot'></span>
                          Order Cancelled
                        </div>

                      ) : (

                        <>
                          <span className='status-label'>
                            Update Status
                          </span>

                          <select
                            onChange={(event) =>
                              statushandler(event, order._id)
                            }
                            value={order.status}
                          >

                            <option value="Food Processing">
                              Food Processing
                            </option>

                            <option value="Out for Delivery">
                              Out for Delivery
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                          </select>
                        </>

                      )
                    }

                  </div>

                </div>


                {/* ================= CUSTOMER DETAILS ================= */}

                <div className='order-details-grid'>

                  {/* CUSTOMER */}

                  <div className='order-detail-box'>

                    <div className='order-detail-icon customer-icon'>
                      👤
                    </div>

                    <div>

                      <span className='order-label'>
                        Customer
                      </span>

                      <h3 className='order-item-name'>
                        {order.address.firstname + " " + order.address.lastname}
                      </h3>

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div className='order-detail-box'>

                    <div className='order-detail-icon email-icon'>
                      ✉️
                    </div>

                    <div>

                      <span className='order-label'>
                        Email Address
                      </span>

                      <h3>
                        {order.address.email}
                      </h3>

                    </div>

                  </div>


                  {/* TELEPHONE */}

                  <div className='order-detail-box'>

                    <div className='order-detail-icon phone-icon'>
                      📞
                    </div>

                    <div>

                      <span className='order-label'>
                        Telephone
                      </span>

                      <h3 className='order-item-phone'>
                        {order.address.telephone}
                      </h3>

                    </div>

                  </div>


                  {/* ADDRESS */}

                  <div className='order-detail-box address-box'>

                    <div className='order-detail-icon address-icon'>
                      📍
                    </div>

                    <div>

                      <span className='order-label'>
                        Delivery Address
                      </span>

                      <h3>
                        {order.address.address}
                      </h3>

                    </div>

                  </div>

                </div>


                {/* ================= FOOD SECTION ================= */}

                <div className='ordered-food-section'>

                  <div className='section-heading'>

                    <div className='section-heading-left'>

                      <div className='section-icon'>
                        🍴
                      </div>

                      <div>

                        <h3>
                          Ordered Items
                        </h3>

                        <span>
                          {order.items.length} item(s)
                        </span>

                      </div>

                    </div>

                  </div>


                  <div className='ordered-food-list'>

                    {
                      order.items.map((item, index) => (

                        <div
                          className='ordered-food-item'
                          key={index}
                        >

                          <span className='food-number'>
                            {index + 1}
                          </span>

                          <span className='food-item-name'>
                            {item.name}
                          </span>

                          <span className='food-item-quantity'>
                            × {item.quantity}
                          </span>

                        </div>

                      ))
                    }

                  </div>

                </div>


                {/* ================= CARD FOOTER ================= */}

                <div className='order-bottom'>

                  <div className='order-payment-info'>

                    <span className='payment-label'>
                      {isCancelled
                        ? "Payment Status"
                        : "Order Total"
                      }
                    </span>

                    {
                      isCancelled ? (

                        <div className='payment-cancelled'>
                          <span>✕</span>
                          Payment Failed / Cancelled
                        </div>

                      ) : (

                        <strong className='order-total-price'>
                          ${order.amount}
                        </strong>

                      )
                    }

                  </div>


                  {
                    !isCancelled && (

                      <div
                        className={`order-complete-status ${
                          order.status === "Delivered"
                            ? "delivered-status"
                            : order.status === "Out for Delivery"
                              ? "delivery-status"
                              : "processing-status"
                        }`}
                      >

                        <span className='status-dot'></span>

                        {order.status}

                      </div>

                    )
                  }


                  {
                    isCancelled && (

                      <div className='cancelled-footer-status'>

                        <span>✕</span>

                        Cancelled

                      </div>

                    )
                  }

                </div>

              </div>

            )
          })
        }


        {/* ================= EMPTY STATE ================= */}

        {
          listdata.length === 0 && (

            <div className='empty-orders'>

              <div className='empty-orders-icon'>
                📦
              </div>

              <h2>No Orders Yet</h2>

              <p>
                Customer orders will appear here once they are placed.
              </p>

            </div>

          )
        }

      </div>

    </div>
  )
}

export default Order;