const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const postSchema=new Schema({
   userName:{
       type:String,
       required:true,
       trim:true,
       lowercase:true,
       minlength:3,
       maxlength:15
   },
   title:{
       type:String,
       required:true,
       minlength:3,
       maxlength:30
   },
   message:{
    type:String,
    required:true,
    minlength:3,
    maxlength:900
},

},{collection:'Posts',timestamps:true});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;