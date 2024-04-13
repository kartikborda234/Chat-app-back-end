const mongoose = require("mongoose");

const roomSchema=new mongoose.Schema({
    createdBy:{
        type:String,
        required:true,
    },
    roomName:{
        type:String,
        required:true,
    },
    members:{
        type:Array,
        required:true,
    }
});
module.exports=mongoose.model('Room',roomSchema);