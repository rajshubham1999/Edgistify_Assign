

import React, { useEffect, useState } from "react";
import "./Product.css";
import API from "../../apis/axiosInstance";

function Product() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getProducts();
        getCurrentUser();
    }, []);

    useEffect(() => {
        if (user && user._id) {
            getCart();
        }
    }, [user]);

    const getProducts = async () => {
        try {
            const response = await API.get("/api/products/get-all-products");
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const currentUser = await API.get("/api/users/get-current-user");
            setUser(currentUser.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    

    const getCart = async () => {
        try {
            const userCart = await API.get(`/api/carts/get-cart/${user._id}`);
            setCart(userCart.data.cart || []);
        } catch (error) {
            console.log(error);
        }
    };

    

    const handleAddToCart = async (item) => {
        try {
            const response = await API.post("/api/carts/add-product", {
                title: item.title,
                price: item.price,
                quantity: 1,
                image: item.image,
                user: user._id,
            });
            console.log(response)
            getCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateQuantity = async (item, change) => {
        try {
            const updatedCart = cart.map((product) =>
                product.title === item.title
                    ? { ...product, quantity: product.quantity + change }
                    : product
            ).filter(product => product.quantity > 0); 

            setCart(updatedCart);

            await API.post("/api/carts/add-product", {
                title: item.title,
                price: item.price,
                quantity: change,
                image: item.image,
                user: user._id,
            });

            getCart();
        } catch (error) {
            console.error(error);
        }
    };

    const getProductQuantity = (title) => {
        const product = cart.find((product) => product.title === title);
        return product ? product.quantity : 0;
    };

    return (
        <div className="product-container">
            <h2 className="title">Our Products</h2>
            <div className="product-grid">
                {products.map((item, ind) => {
                    const quantity = getProductQuantity(item.title);

                    return (
                        <div className="card" key={ind}>
                            <img src={item.image} alt={item.title} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-price">${item.price}</p>
                            </div>

                            {quantity > 0 ? (
                                <div className="cart-controls">
                                    <button className="qty-btn" onClick={() => handleUpdateQuantity(item, -1)}>-</button>
                                    <span className="qty-text">{quantity}</span>
                                    <button className="qty-btn" onClick={() => handleUpdateQuantity(item, 1)}>+</button>
                                </div>
                            ) : (
                                <button className="add-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Product;
