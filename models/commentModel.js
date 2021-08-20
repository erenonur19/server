const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=new Schema({
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
    ref:'Post',
    writable: true
},
   message:{
    type:String,
    required:true,
    minlength:3,
    maxlength:900,
    writable: true
},

},{collection:'Comments',timestamps:true});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;