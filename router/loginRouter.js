const express=require('express');
const router=express.Router();
const User=require('../models/userModel')
const bodyParser=require('body-parser');
router.use(bodyParser.json());

router.post('/register',async(req,res)=>{
    try{ 
        const newUser=new User(req.body);
        const result=await newUser.save();
        res.json(result)

    }catch(err){
     res.status(404).send(`<h1>An error occured..Please try again.</h1>`)
    }
})
router.get('/',async(req,res)=>{
   

 });

module.exports=router;