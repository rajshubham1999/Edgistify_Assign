const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(403).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "Registration successful, Please Login",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ success: false, message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.status(200).send({ success: true, message: "User logged in", data: token });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
});



router.get("/get-current-user",authMiddleware,async(req,res)=>{
    try{
        const user = await User.findById(req.body.userId).select("-password");
        res.send({
            success:true,
            message:"User Deatil fetched Successfully",
            data:user,

        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:err.message
        })
    }
})



module.exports = router;
