const express = require("express");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");  
const router = express.Router();


router.post("/place-order", async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingDetails } = req.body;

        if (!userId || !cartItems.length || !totalPrice || !shippingDetails) {
            return res.status(400).json({ message: "Missing required fields." });
        }

     
        const newOrder = new Order({
            userId,
            cartItems,
            totalPrice,
            shippingDetails
        });

        await newOrder.save();

        // Clear the cart after placing order
         await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Server error. Try again." });
    }
});


router.get("/user-orders/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error. Try again." });
    }
});



module.exports = router;
