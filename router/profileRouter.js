const express=require('express');
const router3=express.Router();
const User=require('../models/userModel')
const verify=require('./verifyToken')



router3.get('/',verify,async(req,res,next)=>{
    try{
        const user1=await User.findById({_id:req.user._id})
    res.json(user1)}
    catch(err){
        console.log(err);
    }



})









module.exports = router3;