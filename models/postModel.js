const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const postSchema=new Schema({
   userName:{
       type:String,
       required:true,
       trim:true,
       minlength:3,
       maxlength:15,
       writable: true
   },
   title:{
       type:String,
       required:true,
       minlength:3,
       maxlength:30,
       unique:true,
       ref:'Comment',
       writable: true
   },
   message:{
    type:String,
    required:true,
    minlength:3,
    maxlength:900,
    writable: true
},

},{collection:'Posts',timestamps:true});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;