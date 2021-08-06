const { json } = require('express');
const express=require('express');
const router=express.Router();
const Post=require('../models/postModel')


router.get('/',async(req,res)=>{
    try{const allPosts=await Post.find({})

    res.json(allPosts)} 
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
   
   router.post('/',async(req,res)=>{
       try{ 
           const newPost=new Post(req.body);
           const result=await newPost.save();
           res.json(result)

       }catch(err){
        res.status(404).send(`<h1>An error occured..Please try again.</h1>`)
       }
      
   });

   router.delete('/:id',async(req,res)=>{
       try{const deleted=await Post.findByIdAndDelete({_id:req.params.id})
           if(deleted){
               return res.json(deleted)
           }else{
               res.status(404).send(`<h1>Error deleting post.. it may have been deleted before.</h1>`)
           }}
           catch(err){
            res.status(404).send(`<h1>An error occured..Please try again.</h1>`);
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

   module.exports=router;