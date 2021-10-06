const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String
    },
    message:{
        type:String
    }
});
const User=mongoose.model('User',userSchema);

module.exports=User;