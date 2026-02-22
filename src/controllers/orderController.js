const Order = require('../models/order');

// POST /api/orders  — create new order
const createOrder = async (req, res) => {
  try {
    const {
      productId,
      productName,
      variantLabel,
      variantPrice,
      emiPlan,
      phone,
    } = req.body;

    // Basic validation
    if (!productId || !productName || !variantLabel || !variantPrice || !emiPlan || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const order = await Order.create({
      productId,
      productName,
      variantLabel,
      variantPrice,
      emiPlan,
      phone,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.orderId,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders  — get all orders (admin use)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders/:orderId  — get single order by orderId
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById };