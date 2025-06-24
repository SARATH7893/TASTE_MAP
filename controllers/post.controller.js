import Post from "../models/posts.model.js"
import User from "../models/profile.model.js"

export const createPost=async(req,res)=>{
    const {token}=req.body;
    try {
        const user=await User.findOne({token:token});
        console.log("file is",req.file.path);
        if (!user) return res.status(404).json({message:"user not found"});
        const post=new Post({
            userId:user._id,
            title:req.body.title,
            ingredients:req.body.ingredients,
            calories:req.body.calories||0,
            proteins:req.body.proteins||0,
            fat:req.body.fat||0,
            taste:req.body.taste||"",
            likes:req.body.likes||0,
            media:req.file?req.file.path:"",
            description:req.body.description,
            country:req.body.country,
        })
        console.log(req.body)
        console.log(post.media)
        await post.save();
        return res.status(200).json({message:"Post created successfully"});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllPosts=async (req,res)=>{
    try {
        const post=await Post.find().populate("userId","name email");

        if(!post || post.length===0) return res.status(404).json({message:"No posts found"});

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const updatePost=async(req,res)=>{
    try {
        const {token,body,postId}=req.body;
        const user=await User.findOne({token});
        if(!user) return res.status(404).json({message:"User not found"});
        const postOfUser=await Post.findOne({_id:postId});
        if(!postOfUser) return res.status(404).json({message:"Post not found"});
        if(user._id.toString()===postOfUser.userId.toString()){
            Object.assign(postOfUser,body);
            await postOfUser.save();
            return res.status(200).json({message:"Post updated successfully"});
        }
        else{
            return res.status(403).json({message:"You can't update this post"});
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deletePost=async (req,res)=>{
    try {
        const {token,postId}=req.body;
        const user=await User.findOne({token});
        if(!user) return res.status(400).json({message:"User Not Found"})
        const postOfUser=await Post.findOne({_id:postId});
        if(!postOfUser) return res.status(400).json({message:"Post not Found"})
        if(user._id.toString()===postOfUser.userId.toString()){
            await Post.findByIdAndDelete(postId);
            return res.status(200).json({message:"Post deleted successfully"});
        }else{
            return res.status(403).json({message:"You can't delete this post"});
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
    

export const filter_post_details=async(req,res)=>{
    try {
        let {min_protein=0,min_calorie=0,min_fat=0,max_protein,max_fat,max_calorie}=req.query;
        min_protein=Number(min_protein)
        min_calorie=Number(min_calorie)
        min_fat=Number(min_fat)
        max_protein=max_protein?Number(max_protein):Infinity
        max_fat=max_fat?Number(max_fat):Infinity
        max_calorie=max_calorie?Number(max_calorie):Infinity
    const data = await Post.find({
  proteins: { $gte: min_protein, $lte: max_protein },
  fat: { $gte: min_fat, $lte: max_fat },
  calories: { $gte: min_calorie, $lte: max_calorie }
});

        if(data.length>0){
            return res.status(200).json({data})
        }
        else{
            return res.status(404).json({message:"No posts found"})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}