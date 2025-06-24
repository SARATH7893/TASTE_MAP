import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        default:""
    },
    ingredients:{
        type:Array,
        default:[],
    },
    calories:{
        type:Number,
        default:0
    },
    proteins:{
        type:Number,
        default:0
    },
    fat:{
        type:Number,
        default:0
    },
    taste:{
        type:String,
        default:""
    },
    likes:{
        type:Number,
        default:0
    },
    media:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    }
})


const Post=mongoose.model("Post",PostSchema);
export default Post;