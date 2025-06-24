import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/profile.model.js'
import Post from '../models/posts.model.js'


export const register=async(req,res)=>{
    try {
        console.log(req.body)
        const{email,password,name,username}=req.body;

        if(!email || !password || !name || !username) return res.status(400).json({message:"All fields Are Required"});
        const existUser=await User.findOne({email})
        if(existUser) return res.status(400).json({message:"Email Already Registered"})
        
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            username,
            password:hashedPassword
        })
        await newUser.save();
        return res.json({message:"Succesfull Registration"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }    
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email ||!password) return res.status(400).json({message:"All Fields Are Required"})
        const user=await User.findOne({email})
        
        if(!user) return res.status(400).json({message:"No Profile Found"})
        
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Password"})
        
        const token =crypto.randomBytes(32).toString("hex");
        await User.updateOne({_id:user._id},{token})
        return res.json({token:token})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const updateUserProfile=async(req,res)=>{
    try {
        const {token,...newUserData}=req.body;
        const user=await User.findOne({token})
        if(!user) return res.status(400).json({message:"No Profile Found"})
        const {email,username}=newUserData;
        const existingUser=await User.findOne({$or:[{username},{email}]})
        if(existingUser){
            if(existingUser || String(existingUser._d)!==String(user._id)){
                return res.status(400).json({message:"Username or Email Already Taken"})
            }
        }
        Object.assign(user,newUserData);
        await user.save()
        return res.json({message:"Profile Updated Succesfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}