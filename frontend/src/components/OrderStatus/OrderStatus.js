import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Steps, Button } from "antd";
import API from "../../apis/axiosInstance";
import "./OrderStatus.css";

const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

const OrderStatus = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        fetchUserOrders();
    }, [userId]);

    const fetchUserOrders = async () => {
        try {
            const response = await API.get(`/api/orders/user-orders/${userId}`);
            if (response.data.length > 0) {
                const latestOrder = response.data[0]; 
                setOrder(latestOrder);

                
                const stepIndex = statusSteps.indexOf(latestOrder.status);
                setCurrentStep(stepIndex !== -1 ? stepIndex : 0);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };

    return (
        <div className="order-status-container">
            <div className="header">
                <h1>Order Successfully Placed!</h1>
                <Button type="primary" danger onClick={handleLogout}>Logout</Button>
            </div>

            {order ? (
                <>
                    <Steps
                        size="small"
                        current={currentStep}
                        items={statusSteps.map((step) => ({ title: step }))}
                    />

                    <div className="order-details">
                        
                        <div className="order-products">
                            <h2>Products</h2>
                            {order.cartItems.map((item) => (
                                <div key={item._id} className="product-item">
                                    <img src={item.image} alt={item.title} className="product-image1" />
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>₹{item.price} x {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        
                        <div className="order-address">
                            <h2>Shipping Address</h2>
                            <p><strong>Address:</strong> {order.shippingDetails.address}</p>
                            <p><strong>City:</strong> {order.shippingDetails.city}</p>
                            <p><strong>Pincode:</strong> {order.shippingDetails.pincode}</p>
                            <p><strong>Phone:</strong> {order.shippingDetails.phoneNumber}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderStatus;
