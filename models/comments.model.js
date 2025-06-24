import mongoose from "mongoose";


const CommentsSchema=new mongooseSchema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    body:{
        type:String,
        required:true
    }
})

const Comment=new mongoose.model("Comment",CommentsSchema)

export default Comment;