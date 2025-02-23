const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    products: [
        {
            title: { type: String, required: true },
            image:{type:String, required:true},
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);
