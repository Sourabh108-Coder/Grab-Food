import React, { useContext, useEffect, useState } from 'react'
import { Storecontext } from '../Context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoFastFoodSharp } from "react-icons/io5";

const MyOrders = () => {

    const [userorders, setuserorders] = useState([]);

    const { token } = useContext(Storecontext);
    const navigate = useNavigate();

    useEffect(() => {

        if (!token) {
            toast.error("Please Login to access functionality!");
            navigate("/");
        }

    }, [token])

    const fetchuserorders = async () => {

        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/grabfood/listorder",
                {},
                { headers: { token } }
            );

            setuserorders(res.data.data);
        }

        catch (error) {
            console.log("Error in Fetching" + error);
        }
    }

    useEffect(() => {

        if (token) {
            fetchuserorders();
        }

    }, [token])

    return (
        <div className='myorders'>

            {/* Header */}
            <div className='orders-header'>
                <div className='orders-title'>
                    <div className='title-icon'>
                        <IoFastFoodSharp />
                    </div>

                    <div>
                        <h1>My Orders</h1>
                        <p>Track and manage your delicious orders</p>
                    </div>
                </div>

                {userorders.length > 0 && (
                    <div className='orders-count'>
                        {userorders.length} {userorders.length === 1 ? 'Order' : 'Orders'}
                    </div>
                )}
            </div>


            {/* Orders */}
            <div className='container'>

                {
                    userorders.length === 0 ? (

                        <div className='no-orders'>

                            <div className='empty-image-wrapper'>
                                <img
                                    src='https://media1.giphy.com/media/X9wdHtZzVFAjJ1QgmZ/giphy.gif'
                                    className='no-orders-gif'
                                    alt='No orders'
                                />
                            </div>

                            <h2>No Orders Yet</h2>

                            <p>
                                Looks like you haven't ordered anything yet.
                                <br />
                                Your next delicious meal is waiting!
                            </p>

                            <button
                                className='browse-food-btn'
                                onClick={() => navigate("/")}
                            >
                                <IoFastFoodSharp />
                                Browse Food
                            </button>

                        </div>

                    ) : (

                        <div className='orders-list'>

                            {
                                userorders.map((order, index) => {

                                    return (

                                        <div key={index} className='order-card'>

                                            {/* Top section */}
                                            <div className='order-top'>

                                                <div className='food-image-wrapper'>
                                                    <img
                                                        src='https://media1.giphy.com/media/X9wdHtZzVFAjJ1QgmZ/giphy.gif'
                                                        className='lstgif'
                                                        alt='Food'
                                                    />
                                                </div>

                                                <div className='order-info'>

                                                    <div className='order-number'>
                                                        Order #{index + 1}
                                                    </div>

                                                    <div className='food-items'>

                                                        {
                                                            order.items.map((item, index) => {

                                                                if (index == order.items.length - 1) {
                                                                    return (
                                                                        <span key={index}>
                                                                            {item.name} × {item.quantity}
                                                                        </span>
                                                                    )
                                                                }

                                                                else {
                                                                    return (
                                                                        <span key={index}>
                                                                            {item.name} × {item.quantity},
                                                                        </span>
                                                                    )
                                                                }

                                                            })
                                                        }

                                                    </div>

                                                </div>

                                                <div className='order-price'>
                                                    ${order.amount}.00
                                                </div>

                                            </div>


                                            {/* Bottom information */}
                                            <div className='order-bottom'>

                                                <div className='order-detail'>
                                                    <span className='detail-label'>Items</span>
                                                    <span className='detail-value'>
                                                        {order.items.length}
                                                    </span>
                                                </div>


                                                <div className='order-detail status-detail'>

                                                    <span className='detail-label'>
                                                        Status
                                                    </span>

                                                    <span
                                                        className={
                                                            order.Payment
                                                                ? 'status-badge'
                                                                : 'status-badge cancelled'
                                                        }
                                                    >
                                                        <span className='status-dot'></span>

                                                        {
                                                            order.Payment
                                                                ? order.status
                                                                : "Order Cancelled"
                                                        }

                                                    </span>

                                                </div>


                                                <button
                                                    className='tr-but'
                                                    onClick={fetchuserorders}
                                                >
                                                    Track Order
                                                    <span>→</span>
                                                </button>

                                            </div>

                                        </div>

                                    )
                                })
                            }

                        </div>

                    )
                }

            </div>

        </div>
    )
}

export default MyOrders