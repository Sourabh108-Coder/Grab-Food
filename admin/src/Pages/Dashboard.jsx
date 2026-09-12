import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchDashboard = async () => {
    try {

      const response = await axios.get(
        "http://localhost:4000/api/v1/grabfood/admindashboard"
      );

      if (response.data.success) {
        setDashboard(response.data.data);
      }

    } catch (error) {
      toast.error("Error in Fetching Dashboard");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchDashboard();
  }, []);


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="dashboard-loading">

        <div className="dashboard-spinner"></div>

        <p>Loading Dashboard...</p>

      </div>
    );
  }


  /* =========================
     SAFETY CHECK
  ========================= */

  if (!dashboard) {
    return (
      <div className="dashboard-error">

        <div className="dashboard-error-icon">
          ⚠️
        </div>

        <h2>Unable to Load Dashboard</h2>

        <p>
          Something went wrong while fetching your dashboard data.
        </p>

        <button onClick={fetchDashboard}>
          Try Again
        </button>

      </div>
    );
  }


  const {
    overview,
    today,
    recentOrders
  } = dashboard;


  return (

    <div className="dashboard-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="dashboard-header">

        <div className="dashboard-title-section">

          <div className="dashboard-main-icon">
            📊
          </div>

          <div>

            <h1>Dashboard</h1>

            <p>
              Welcome back! Here's what's happening with your food business.
            </p>

          </div>

        </div>


        <div className="dashboard-date">

          <span>📅</span>

          <div>
            <small>Today</small>
            <strong>
              {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </strong>
          </div>

        </div>

      </div>


      {/* =================================
          MAIN STAT CARDS
      ================================= */}

      <div className="dashboard-stats">


        {/* TOTAL FOOD */}

        <div className="dashboard-stat-card food-stat">

          <div className="stat-card-top">

            <div className="stat-icon">
              🍽️
            </div>

            <span className="stat-tag">
              Menu
            </span>

          </div>

          <div className="stat-card-content">

            <span className="stat-label">
              Total Food Items
            </span>

            <h2>
              {overview.totalFoods}
            </h2>

            <p>
              Items available in menu
            </p>

          </div>

        </div>


        {/* TOTAL ORDERS */}

        <div className="dashboard-stat-card order-stat">

          <div className="stat-card-top">

            <div className="stat-icon">
              📦
            </div>

            <span className="stat-tag">
              Orders
            </span>

          </div>

          <div className="stat-card-content">

            <span className="stat-label">
              Total Orders
            </span>

            <h2>
              {overview.totalOrders}
            </h2>

            <p>
              Orders received
            </p>

          </div>

        </div>


        {/* DELIVERED */}

        <div className="dashboard-stat-card delivered-stat">

          <div className="stat-card-top">

            <div className="stat-icon">
              ✓
            </div>

            <span className="stat-tag">
              Success
            </span>

          </div>

          <div className="stat-card-content">

            <span className="stat-label">
              Delivered Orders
            </span>

            <h2>
              {overview.deliveredOrders}
            </h2>

            <p>
              Successfully delivered
            </p>

          </div>

        </div>


        {/* CANCELLED */}

        <div className="dashboard-stat-card cancelled-stat">

          <div className="stat-card-top">

            <div className="stat-icon">
              ✕
            </div>

            <span className="stat-tag">
              Cancelled
            </span>

          </div>

          <div className="stat-card-content">

            <span className="stat-label">
              Cancelled Orders
            </span>

            <h2>
              {overview.cancelledOrders}
            </h2>

            <p>
              Payment cancelled
            </p>

          </div>

        </div>

      </div>


      {/* =================================
          REVENUE + TODAY
      ================================= */}

      <div className="dashboard-middle">


        {/* REVENUE CARD */}

        <div className="revenue-card">

          <div className="revenue-header">

            <div>

              <span className="dashboard-section-label">
                TOTAL REVENUE
              </span>

              <h2>
                ₹{overview.totalRevenue.toLocaleString('en-IN')}
              </h2>

              <p>
                Revenue from successful payments
              </p>

            </div>


            <div className="revenue-icon">
              💰
            </div>

          </div>


          <div className="revenue-bottom">

            <div className="revenue-mini">

              <span>Today's Revenue</span>

              <strong>
                ₹{today.revenue.toLocaleString('en-IN')}
              </strong>

            </div>


            <div className="revenue-divider"></div>


            <div className="revenue-mini">

              <span>Today's Orders</span>

              <strong>
                {today.orders}
              </strong>

            </div>

          </div>

        </div>


        {/* ORDER STATUS CARD */}

        <div className="status-card">

          <div className="section-card-header">

            <div>

              <h2>Order Status</h2>

              <p>
                Current order distribution
              </p>

            </div>

            <div className="status-header-icon">
              📈
            </div>

          </div>


          <div className="status-list">


            {/* PROCESSING */}

            <div className="status-row">

              <div className="status-name">

                <span className="status-color processing-color"></span>

                <span>Food Processing</span>

              </div>

              <strong>
                {overview.processingOrders}
              </strong>

            </div>


            {/* DELIVERY */}

            <div className="status-row">

              <div className="status-name">

                <span className="status-color delivery-color"></span>

                <span>Out for Delivery</span>

              </div>

              <strong>
                {overview.outForDeliveryOrders}
              </strong>

            </div>


            {/* DELIVERED */}

            <div className="status-row">

              <div className="status-name">

                <span className="status-color delivered-color"></span>

                <span>Delivered</span>

              </div>

              <strong>
                {overview.deliveredOrders}
              </strong>

            </div>


            {/* CANCELLED */}

            <div className="status-row">

              <div className="status-name">

                <span className="status-color cancelled-color"></span>

                <span>Cancelled</span>

              </div>

              <strong>
                {overview.cancelledOrders}
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* =================================
          RECENT ORDERS
      ================================= */}

      <div className="recent-orders-card">

        <div className="recent-orders-header">

          <div>

            <h2>Recent Orders</h2>

            <p>
              Latest customer orders
            </p>

          </div>


          <div className="recent-orders-count">

            {recentOrders.length} Recent

          </div>

        </div>


        <div className="recent-orders-table">


          {/* TABLE HEADER */}

          <div className="recent-order-row recent-order-title">

            <span>Order</span>

            <span>Customer</span>

            <span>Items</span>

            <span>Amount</span>

            <span>Status</span>

          </div>


          {
            recentOrders.length > 0 ? (

              recentOrders.map((order, index) => {

                const isCancelled = order.Payment === false;

                const customerName =
                  order.address?.firstname +
                  " " +
                  order.address?.lastname;


                return (

                  <div
                    className="recent-order-row"
                    key={order._id || index}
                  >

                    {/* ORDER */}

                    <div className="recent-order-number">

                      <div className="mini-order-icon">
                        🍴
                      </div>

                      <div>

                        <strong>
                          #{index + 1}
                        </strong>

                        <small>
                          {new Date(order.date).toLocaleDateString(
                            'en-IN',
                            {
                              day: 'numeric',
                              month: 'short'
                            }
                          )}
                        </small>

                      </div>

                    </div>


                    {/* CUSTOMER */}

                    <div className="recent-customer">

                      <div className="customer-avatar">
                        {customerName?.charAt(0)?.toUpperCase()}
                      </div>

                      <span>
                        {customerName}
                      </span>

                    </div>


                    {/* ITEMS */}

                    <div className="recent-items">

                      {order.items?.length || 0} item(s)

                    </div>


                    {/* AMOUNT */}

                    <div className="recent-amount">

                      ₹{order.amount?.toLocaleString('en-IN')}

                    </div>


                    {/* STATUS */}

                    <div>

                      {
                        isCancelled ? (

                          <span className="recent-status cancelled-recent">
                            <i></i>
                            Cancelled
                          </span>

                        ) : (

                          <span
                            className={`recent-status ${
                              order.status === "Delivered"
                                ? "delivered-recent"
                                : order.status === "Out for Delivery"
                                  ? "delivery-recent"
                                  : "processing-recent"
                            }`}
                          >

                            <i></i>

                            {order.status}

                          </span>

                        )
                      }

                    </div>

                  </div>

                );

              })

            ) : (

              <div className="recent-empty">

                <div>
                  📦
                </div>

                <h3>No Recent Orders</h3>

                <p>
                  New customer orders will appear here.
                </p>

              </div>

            )

          }

        </div>

      </div>


      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <div className="quick-actions">

        <div className="quick-actions-title">

          <span>⚡</span>

          <div>

            <h2>Quick Actions</h2>

            <p>
              Manage your store quickly
            </p>

          </div>

        </div>


        <div className="quick-action-buttons">

          <button
            className="quick-action-button primary-action"
            onClick={() => window.location.href = "/add"}
          >

            <span>＋</span>

            <div>
              <strong>Add Food</strong>
              <small>Add a new menu item</small>
            </div>

          </button>


          <button
            className="quick-action-button secondary-action"
            onClick={() => window.location.href = "/list"}
          >

            <span>🍽️</span>

            <div>
              <strong>Manage Food</strong>
              <small>View your food menu</small>
            </div>

          </button>


          <button
            className="quick-action-button secondary-action"
            onClick={() => window.location.href = "/order"}
          >

            <span>📦</span>

            <div>
              <strong>View Orders</strong>
              <small>Manage customer orders</small>
            </div>

          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;