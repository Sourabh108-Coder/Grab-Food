const foodModel=require("../models/foodmodel");
const orderModel=require("../models/Ordermodel");

exports.dashboard = async (req, res) => {
    try {

        // =========================
        // FOOD COUNT
        // =========================

        const totalFoods = await foodModel.countDocuments();


        // =========================
        // ORDER COUNTS
        // =========================

        const totalOrders = await orderModel.countDocuments();


        const processingOrders = await orderModel.countDocuments({
            Payment: true,
            status: "Food Processing"
        });


        const outForDeliveryOrders = await orderModel.countDocuments({
            Payment: true,
            status: "Out for Delivery"
        });


        const deliveredOrders = await orderModel.countDocuments({
            Payment: true,
            status: "Delivered"
        });


        // Payment false = Cancelled
        const cancelledOrders = await orderModel.countDocuments({
            Payment: false
        });


        // =========================
        // TOTAL REVENUE
        // =========================

        const revenueResult = await orderModel.aggregate([
            {
                $match: {
                    Payment: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ]);


        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // =========================
        // TODAY'S DATE
        // =========================

        const startOfToday = new Date();

        startOfToday.setHours(0, 0, 0, 0);


        const endOfToday = new Date();

        endOfToday.setHours(23, 59, 59, 999);


        // =========================
        // TODAY'S ORDERS
        // =========================

        const todayOrders = await orderModel.countDocuments({
            date: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        });


        // =========================
        // TODAY'S REVENUE
        // =========================

        const todayRevenueResult = await orderModel.aggregate([
            {
                $match: {
                    Payment: true,
                    date: {
                        $gte: startOfToday,
                        $lte: endOfToday
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ]);


        const todayRevenue =
            todayRevenueResult.length > 0
                ? todayRevenueResult[0].totalRevenue
                : 0;


        // =========================
        // RECENT ORDERS
        // =========================

        const recentOrders = await orderModel
            .find({})
            .sort({ date: -1 })
            .limit(5)
            .lean();


        // =========================
        // RESPONSE
        // =========================

        res.status(200).json({

            success: true,

            data: {

                overview: {

                    totalFoods,

                    totalOrders,

                    processingOrders,

                    outForDeliveryOrders,

                    deliveredOrders,

                    cancelledOrders,

                    totalRevenue

                },

                today: {

                    orders: todayOrders,

                    revenue: todayRevenue

                },

                recentOrders

            },

            message: "Dashboard Data Fetched Successfully"

        });

    }

    catch (error) {

        console.log("Dashboard Error:", error);

        res.status(500).json({

            success: false,

            data: null,

            message: error.message

        });

    }
};
