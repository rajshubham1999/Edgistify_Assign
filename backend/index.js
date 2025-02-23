const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();
const dbConfig = require("./config/dbConfig")
const PORT = process.env.PORT || 3001 
const userRoutes = require("./routes/userRoutes");
const productRoutes= require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes")



app.use(cors());
app.use(express.json()); 
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts",cartRoutes)
app.use("/api/orders",orderRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})