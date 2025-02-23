import React from "react";
import Navbar from "../Navbar/Navbar";
import Product from "../Products/Product";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Product />
      </div>
    </div>
  );
}

export default Dashboard;
