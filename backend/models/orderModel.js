const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products"},
            title: { type: String, required: true },
            image: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingDetails: {
        address: { type: String, required: true },
        pincode: { type: String, required: true },
        city: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);
