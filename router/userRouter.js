const { json } = require('express');
const express=require('express');
const router=express.Router();
const Post=require('../models/postModel')


router.get('/',async(req,res)=>{
    try{const allPosts=await Post.find({})

    res.json(allPosts)} 
    catch(err){
        console.log(err);
    }

 });
 router.get('/:id',async(req,res)=>{
    try{
        const rqPost= await Post.findById({_id:req.params.id})
        if (rqPost){
            res.json(rqPost)
        }
        else{
            res.status(404).json({message:"Kullanıcı bulunamadı.."})
        }
    }catch(err){
        console.log(err);
    }
   });
   
   router.post('/',async(req,res)=>{
       try{ 
           const newPost=new Post(req.body);
           const result=await newPost.save();
           res.json(result)

       }catch(err){
           console.log("eklenme sırasında hata oluştu.."+err);
       }
      
   });

   router.delete('/:id',async(req,res)=>{
       try{const deleted=await Post.findByIdAndDelete({_id:req.params.id})
           if(deleted){
               return res.json({"message":"basariyla silindi"})
           }else{
               res.status(404).json({"message":"Kullanıcı bulunamadı"})
           }}
           catch(err){
               console.log("hata cıktı"+err);
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
    const {id}=req.params
    try{
        const response=await Post.findByIdAndUpdate(id,req.body)
        if(!response) throw Error('Error occured')
        const updated={ ...response._doc, ...req.body}
        res.status(200).json(updated)
    }
    catch(err){
        res.status(500).json({message:error.message})
    }
})

   module.exports=router;