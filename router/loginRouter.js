const express=require('express');
const router2=express.Router();
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



router2.post('/register',async(req,res)=>{
        
     
         
        const newUser=new User({
            name:req.body.name,
            userName:req.body.userName,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,9)
        });
         newUser.save(error=>{
             if(error){
                 return res.status(400).json({
                     error:'This email or username is used'
                 })
             }
             return res.status(200).json({
                 
             })
         })
         
    
     
    
    });
    
router2.post('/login', async(req,res)=>{
    await User.findOne({userName:req.body.username},(err,user)=>{
        
       if(err){
            return res.status(500).json({error:err})
        }
       if(!user){
            return res.status(401).json({error:"User doesnt exists.."})
        }
       if(!bcrypt.compareSync(req.body.password,user.password)){
             return res.status(401).json({error:"Incorrect username or password!"})
        }
        let token = jwt.sign({user_id:user._id},'mostsecretkey');

        return res.json({
            token:token
        })

    })

})


module.exports=router2;