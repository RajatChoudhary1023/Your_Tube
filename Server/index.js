import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import videoroutes from './Routes/video.js'
import userroutes from "./Routes/User.js"
import path from 'path'
import commentroutes from './Routes/comment.js'
import sendOtpEmail from "./Controllers/sendotpmail.js"
import Razorpay from "razorpay"
import crypto from "crypto"
import userschema from './Models/Auth.js'
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))



app.get('/',(req,res)=>{
    res.send("Your tube is working")
})


app.use(bodyParser.json())
app.use('/user',userroutes)
app.use('/video',videoroutes)
app.use('/comment',commentroutes)
const PORT= process.env.PORT || 5000
const otpStore = new Map();
app.post('/send-otp', async (req, res) => {
    const { email } = req.body; 

    try {
        const otp=await sendOtpEmail(email)
        console.log('Generated OTP:', otp);
        otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); 
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const storedOtpData = otpStore.get(email);

    if (!storedOtpData) {
        return res.status(400).json({ error: 'No OTP found for this email' });
    }


    if (Date.now() > storedOtpData.expiresAt) {
        otpStore.delete(email); 
        return res.status(400).json({ error: 'OTP has expired' });
    }


    if (storedOtpData.otp === otp) {
        otpStore.delete(email); 
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ error: 'Invalid OTP' });
    }
});

app.post("/order", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,   
        key_secret:process.env.RAZORPAY_KEY_SECRET,
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });
  
  app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } =
      req.body;
    console.log("User ID:", userId);

    try {
      const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest("hex");
  
      if (digest !== razorpay_signature) {

        return res.status(400).json({ msg: "Transaction is not legit!" });
      }
  

      const user = await userschema.findByIdAndUpdate(userId, { ispremium: true }, { new: true });
      console.log("Updated User:", user);
      
      
  

      return res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } catch (err) {

      console.error("Error updating user status:", err.message);
      res.status(500).json({ error: "Database update failed", details: err.message });

      return res.status(500).json({ error: "Error updating user status" });
    
    }
  });
  



app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb Database connected")
}).catch((error)=>{
    console.log(error)
})
