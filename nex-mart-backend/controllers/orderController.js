const asyncHandler = require('../utils/asyncHandler');
const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { products, totalPrice } = req.body;

    if (products && products.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            products,
            user: req.user._id,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

module.exports = { addOrderItems, getMyOrders };
