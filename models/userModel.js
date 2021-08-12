const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:15
    },
   userName:{
       type:String,
       required:true,
       trim:true,
       minlength:3,
       maxlength:15,
       unique:true,
   },
   email:{
    type:String,
    required:true,
    minlength:3,
    maxlength:30,
    unique:true,
},
   password:{
    type:String,
    required:true,
    minlength:3,
    maxlength:20,
},

},{collection:'Users',timestamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;