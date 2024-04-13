const express = require("express");
const { registerUser, authUser, allUsers, allGroups, addGroup, editGroupName, deleteGroup, getAllMessages,getMessages } = require("../controller/userController");
const { verifyToken } = require("../middleware/varifyToken");

const router =express.Router();

//users routes
router.post('/register',registerUser);
router.post('/login',authUser);
router.get('/allUsers', verifyToken,allUsers);

//groups routes
router.post('/createGroup',addGroup);
router.get('/allGroups', verifyToken,allGroups);
router.post('/groupUpdateById/:id',editGroupName);
router.post('/groupDeleteById/:id',deleteGroup);

//messages routes
router.post('/message/:msgType',getAllMessages);

router.get('/getMessage/:msgType',getMessages)

module.exports=router;