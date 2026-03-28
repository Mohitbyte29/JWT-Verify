import argon from "argon2"
import jwt from "jsonwebtoken"

let users = []
let nextId = 1
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({success: false, message: "Email or Password is missing"})
    }
    if(!emailRegex.test(email)){
        return res.status(400).json({success: false, message: "Invalid Email Format"})
    }
    if(users.find(n => n.email === email)){
        return res.status(409).json({success: false, message: "User Already Exists!"})
    }
    const hashedPassword = await argon.hash(password, 10);

    const user = {id: nextId++, name, email, password: hashedPassword, registeredAt : new Date()};
    users.push(user);
    console.log(JSON.stringify(user));
    return res.status(201).json({success: true, message: "User Registered Successfully"})
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: "Email or Password should not be empty"});
    }
    const user = users.find(n => n.email === email);
    if(!user){
        return res.status(401).json({success: false, message: "Invalid Email or Password"});
    }
    const isMatch = await argon.verify(user.password, password);
    if(!isMatch){
        return res.status(401).json({success: false, message: "Invalid Email or Password"});
    }
    const token = jwt.sign({
        id: user.id,
        email: user.email
    },process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({success: true, message: "Login successful", data: {token}})
}

export const getProfile = (req, res) => {
    res.status(200).json({success: true, message: "Returns the logged in user's Profile"})
}
