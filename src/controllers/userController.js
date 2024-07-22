// JWT Token Create:

const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {    //Database related function should be asynchonous  bcz it's time consuming

    // Steps for Signup:
    // 1. Existing user Check
    // 2. Hashed Password
    // 3. User Creation
    // 4. Token Generate

    const { username, email, password } = req.body;

    try {
        // Existing user Check
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashed Password
        const hashedPassword = await bcrypt.hash(password, 10);    // made Hashed Password (password encripted method) and run it for 10 times (as a salt) and store in database

        // User Creation
        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        // Token Generate
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signin = async (req, res) => {
    // Your signin logic here

    const { email, password } = req.body;

    try{
        // After login check Existing user if not not  found then you can't login
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // Useing bcrypt library for compare the user password with database hashed password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({ message: "Invalis cradentials"});
        }

        // Token Generate
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });


    }catch(error){
        console.log(error);
        res.status(500).json({message: "User already exist"});
    }

};

module.exports = { signup, signin };
