import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String,
        default:"default.jpg"
    },
    token:{
        type:String,
        default:""
    }
})


const User=mongoose.model("User",userSchema);
export default User;