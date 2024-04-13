const { generateToken } = require("../config/generateToken");
const User = require("../model/User");
const Room = require("../model/Room");
const Message = require("../model/Message");
const bcrypt = require("bcrypt");

const registerUser=async(req,res)=>{
    console.log(req.body);
    const {name, email, username, password, socketId} = req.body;

    if (!name || !email || !username || !password ) {
        res.status(400).send("Please enter all fields");
        // throw new Error("Please enter all fields!");
    }
    const findUser = await User.findOne({email: email});
    if (findUser && findUser.email === email) {
        res.send({error: "user already Exists"});
    } else {
        const user = await User.create({name,username,email,password,socketId});
        
        if (user) {
            res.status(200).json({
                token:generateToken(user._id,email),
                name:user.name,
                userName:user.username,
                email:user.email
            })
        }else{
            res.status(400).send("Failed to user create!")
            // throw new Error("Failed to user create!!");    
        }
    }
}

const authUser=async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    // if (email===user.email) {
        if (user && bcrypt.compare(password,user.password)) {
            res.status(200).json({
                _id:user._id,
                name:user.name,
                username:user.username,
                token:generateToken(user._id,user.email)
            })
        }
        else{
            res.send("Invalid email or paaword!");
            // throw new Error("Invalid email or paaword!")
        }
    // }         
}

const allUsers= async(req,res)=>{
    const users = await User.find();
    res.status(200).send(users);
}

const addGroup= async(req,res) => {
    const {createdBy,name,members} =req.body;

    if (!name || !members) {    
        res.status(400);
        throw new Error("Please enter all fields!");
    }
    
    const group = await Room.create({createdBy,roomName:name,members});
    
    if (group) {
        res.status(200).json({
            createdBy:group.createdBy,
            name:group.name,
            members:group.members
        })
    }else{
        res.status(400).send("Failed to group create!!");
        // throw new Error("Failed to group create!!");    
    }
}

const allGroups= async(req,res)=>{
    const rooms = await Room.find();
    res.status(200).send(rooms);
}

const editGroupName=async (req,res) => {
    const {id}=req.params;
    const {roomName}=req.body;

    if (!id || !roomName) {    
        res.status(400).send("Please enter all fields!");
        // throw new Error("Please enter all fields!");
    }

    const update =await Room.findByIdAndUpdate({_id:id},{roomName:roomName});

    const result = await Room.findOne(update._id);
    res.status(200).send({result,success:true});
}

const deleteGroup= async(req,res)=>{
    const {id}=req.params;
    await Room.findByIdAndDelete(id);
    res.status(200).send({success:true});
}

const getAllMessages= async (req,res)=>{
    let data=[];
    const {id,user}=req.body;
    const findMessages = await Message.find({messageType:req.params.msgType})
    if(req.params.msgType==="Group"){
        findMessages.map((item)=>{
            if (item.msgTo===id){
                data.push(item)
            }
        })
        res.send(data)
    }
    else if(req.params.msgType==="Personal"){
        findMessages.map((item)=> {
            if (item?.msgBy=== user?._id && item.msgTo===id || item.msgBy===id && item.msgTo===user._id){
                data.push(item);
            }
        })
        res.send(data);
    }
}

const getMessages =async(req,res) => {
    const findMessages = await Message.find({messageType:req.params.msgType})
    res.send(findMessages);
}

module.exports={registerUser,authUser,allUsers,allGroups,addGroup,editGroupName,deleteGroup,getAllMessages,getMessages};   