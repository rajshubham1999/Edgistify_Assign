
const router = require("express").Router();
const Cart = require("../models/cartModel");

router.post("/add-product", async (req, res) => {
    try {
        const { title, price, quantity, image, user } = req.body;

        if (!title || !price || !user) {
            return res.status(400).json({ message: "Title, price, and user ID are required" });
        }

        let userCart = await Cart.findOne({ user });

        if (userCart) {
            const existingProduct = userCart.products.find(product => product.title === title);

            if (existingProduct) {
                const unitPrice = existingProduct.price / existingProduct.quantity; 

                existingProduct.quantity += quantity || 1;

                if (existingProduct.quantity <= 0) {
                    
                    userCart.products = userCart.products.filter(product => product.title !== title);
                } else {
                    existingProduct.price = unitPrice * existingProduct.quantity; 
                }
            } else {
                if (quantity > 0) {
                    userCart.products.push({ title, price, quantity , image });
                }
            }

            await userCart.save();
            return res.status(200).json({ message: "Cart updated", cart: userCart });
        } else {
            if (quantity > 0) {
                const newCart = new Cart({
                    user,
                    products: [{ title, price, quantity , image }]
                });

                await newCart.save();
                return res.status(201).json({ message: "New cart created and product added", cart: newCart });
            } else {
                return res.status(400).json({ message: "Cannot add product with 0 quantity" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


router.get("/get-cart/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userCart = await Cart.findOne({ user: userId }).populate("user", "name email");

        if (!userCart || userCart.products.length === 0) {
            return res.status(404).json({ message: "No products found in cart for this user" });
        }

        res.status(200).json({ message: "Cart fetched successfully", cart: userCart.products });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
