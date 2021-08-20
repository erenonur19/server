const express=require('express');
const router3=express.Router();
const User=require('../models/userModel')
const verify=require('./verifyToken')
const Post=require('../models/postModel')



router3.get('/',verify,async(req,res,next)=>{
    try{
        const user1=await User.findById({_id:req.user._id})
    res.json(user1)}
    catch(err){
        console.log(err);
    }



})

router3.get('/posts',verify,async(req,res,next)=>{
    try{
       let user=await User.findById({_id:req.user._id})
       let username=user.userName;
       let posts=await Post.find({userName:username})
       res.json(posts)
      
    }
    catch(err){
        console.log(err);
    }



})









module.exports = router3;