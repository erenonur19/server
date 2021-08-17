const express=require('express');
const router=express.Router();
const Post=require('../models/postModel')
const Comment=require('../models/commentModel')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const verify=require('./verifyToken')

router.get("/:id/comments", async(req,res) => {
       let PostName=await Post.findById({_id:req.params.id})
       const title1=await PostName.title;
       const messages= await Comment.find({title:title1});
       res.json(messages)
       
      });


router.post('/:id/comments',async(req,res)=>{
    try{ 
    let PostName=await Post.findById({_id:req.params.id})
       const title1=await PostName.title;
        const newComment=new Comment({
            userName:req.body.userName,
            message:req.body.message,
            title:title1,
            
        });
        const result=await newComment.save();
        res.json(result)

    }catch(err){
     res.status(404).send(`<h1>An error occured..Please try again.</h1>`)
    }
 });
 router.delete('/comments/:id',async(req,res)=>{
    try{const deletedComment=await Comment.findByIdAndDelete({_id:req.params.id})
        if(deletedComment){
            return res.json(deletedComment)
        }else{
            res.status(404).send(`<h1>Error deleting post.. it may have been deleted before.</h1>`)
        }}
        catch(err){
         res.status(404).send(`<h1>An error occured..Please try again.</h1>`);
        }
        
    });
    router.delete('/:id',async(req,res)=>{
        try{
            const deletedPost=await Post.findByIdAndDelete({_id:req.params.id})
            await Comment.deleteMany({title:deletedPost.title})

            if(deletedPost){
                return res.json({message:"Deleted Succesfulyy"})
            }else{
                res.send(`<h1>Error deleting post.. it may have been deleted before.</h1>`)
            }}
            catch(err){
              console.log(err);
            }
            
        });

router.get('/',verify,async(req,res,next)=>{
    // res.send(req.user._id)
    try{const allPosts=await Post.find({})

    res.json(allPosts)
    next()
} 
    catch(err){
        res.status(404).send(`<h1>Oops..Error while listing posts</h1>`)
    }

 });
 router.get('/:id',async(req,res)=>{
    try{
        const rqPost= await Post.findById({_id:req.params.id})
        if (rqPost){
            res.json(rqPost)
        }
        else{
            res.status(404).send(`<h1>An error occured.. It may have been deleted.</h1>`)
        }
    }catch(err){
        res.status(404).send(`<h1>An error occured.. It may have been deleted.</h1>`)
    }
   });
   
   router.post('/',verify,async(req,res)=>{
    
          try{
             
            const user1=await User.findById({_id:req.user._id})
            const username1=await user1.userName;
             const newPost=new Post({
                 userName:username1,
                 title:req.body.title,
                 message:req.body.message,
                 
     
                    });
                const result=await newPost.save();
                res.json(result)

           
        }
        catch(err){
            console.log(err);
        }
      
   });

   
   

//    router.patch('/:id',async(req,res)=>{
//         try{
//            const result=await Post.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
//            if(result){
//                return res.json(result)
//            }
//            else{
//                return res.status(404).json({
//                    message:"POST bulunamadı."
//                })
//            }
         
//         }
//         catch(err){
//             console.log(err);
//         }
//     })

router.put('/:id',async(req,res)=>{
    
        const{id}=req.params
        const{userName,title,message}=req.body
        const updated={userName,title,message,_id:id}
        await Post.findByIdAndUpdate(id,updated,{new:true})
    
})

module.exports = router;
