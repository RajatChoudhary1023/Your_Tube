import users from "../Models/Auth.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email } = req.body;

    try {
        const exstingUser = await users.findOne({ email });
        console.log('Existing user:', exstingUser);  

        if (!exstingUser) {

            try {
                const newUser = await users.create({ email });

                const token = jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.JWT_SECERT, { expiresIn: "1h" });


                return res.status(200).json({ result: newUser, token, message: 'OTP sent to email' });
            } catch (error) {
                console.error('Error creating new user:', error);
                return res.status(500).json({ message: "Something went wrong during user creation..." });
            }
        } else {

            const token = jwt.sign({
                email: exstingUser.email,
                id: exstingUser._id
            }, process.env.JWT_SECERT, { expiresIn: "1h" });


            return res.status(200).json({ result: exstingUser, token, message: 'OTP sent to email' });
        }
    } catch (error) {
        console.error("Error during login process:", error);
        return res.status(500).json({ message: "Something went wrong..." });
    }
};




