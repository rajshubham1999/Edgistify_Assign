

import React, { useEffect, useState } from "react";
import API from "../../apis/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await API.get(`/api/carts/get-cart/${userId}`);
            setCartItems(response.data.cart || []); 
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartItems([]); 
        }
    };

   
    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0)
        : 0;

    const handlePlaceOrder = () => {
        navigate(`/order/${userId}`);
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2 className="cart-title">Shopping Cart</h2>
                <button className="place-order-btn" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                    Place Order
                </button>
            </div>

            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item._id}>
                            <img src={item.image} alt={item.title} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="cart-actions">
                                <span className="cart-qty">{item.quantity}</span>
                            </div>
                            <div>
                                <p className="cart-price">₹{item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}

                    
                    <div className="cart-total">
                        <h3>Total Cost: ₹{totalPrice}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
