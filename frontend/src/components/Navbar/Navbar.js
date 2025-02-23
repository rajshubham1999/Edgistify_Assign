import React, { useEffect, useState } from "react";
import { Link,Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import API from '../../apis/axiosInstance'

const Navbar = () => {
  const navigate = useNavigate();
  const[user,setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
        const currentUser = await API.get("/api/users/get-current-user");
        setUser(currentUser.data.data._id)
    } catch (err) {
        console.log(err);
    }
};

console.log("userId=>",user);
  const handleCart=()=>{
    console.log("userId2=>",user);
    navigate(`/cart/${user}`)
  }
  const handleout=()=>{
    localStorage.removeItem("token");
  }

  useEffect(()=>{
    getCurrentUser();
  },[])
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div>Home</div>
      </div>
      <div className="navbar-right">
        <div onClick={handleCart}>Cart</div>
        <div onClick={handleout}>Log Out</div>
      </div>
    </nav>
  );
};

export default Navbar;
