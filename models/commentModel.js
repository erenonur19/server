const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=new Schema({
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
    maxlength:30,
},
   message:{
    type:String,
    required:true,
    minlength:3,
    maxlength:900
},

},{collection:'Comments',timestamps:true});
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;