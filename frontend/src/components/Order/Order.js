import React, { useEffect, useState } from "react";
import API from "../../apis/axiosInstance";
import { useParams,useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        address: "",
        pincode: "",
        city: "",
        phoneNumber: ""
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await API.get(`/api/carts/get-cart/${userId}`);
            const cart = response.data.cart || [];
            setCartItems(cart);

            const total = cart.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
            setTotalPrice(total);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOrderSubmit = async () => {
        if (!formData.address || !formData.pincode || !formData.city || !formData.phoneNumber) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const orderData = {
                userId,
                cartItems,
                totalPrice,
                shippingDetails: formData
            };
            await API.post("/api/orders/place-order", orderData);
            alert("Order placed successfully!");
            navigate(`/orderstatus/${userId}`)
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Try again.");
        }
    };

    return (
        <div>
            <h1>Orders</h1>
        <div className="order-container">
           
        
            <div className="cart-summary">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-image" />
                                    <div className="cart-details">
                                        <h4>{item.title}</h4>
                                        <p>₹{item.price} x {item.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h3>Total: ₹{totalPrice}</h3>
                    </>
                )}
            </div>

            
            <div className="order-form">
                <h2>Shipping Details</h2>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                <button className="order-btn" onClick={handleOrderSubmit}>Place Order</button>
            </div>
        </div>
        </div>
    );
};

export default Order;
