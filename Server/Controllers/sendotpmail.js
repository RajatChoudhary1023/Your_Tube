import nodemailer from 'nodemailer';


const sendOtpEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Your-Tube login',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        console.log(`Sending OTP to ${email}`);
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully!");
        console.log("OTP:",otp);
        return otp; 
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error; 
    }
};

export default sendOtpEmail;