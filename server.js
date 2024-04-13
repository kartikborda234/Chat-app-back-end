const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
var cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const Message =require("./model/Message")
const User =require("./model/User")

//database connection
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on("chat", async ({ans, userId, msgTo, type, serverId}) => { 
        // const a = await User.findOne({_id: userId});
        const message = await Message.create({
            messageContent: ans,
            msgBy: userId,
            msgTo: msgTo,
            serverId: serverId,
            messageType: type,
        })   

        io.emit("message", message);
        // socket.broadcast.emit("sendMessage", {
        //     messageContent: ans,
        //     msgBy: userId,
        //     msgTo: msgTo,
        // })
    })

    //getUserById
    socket.on("getUserById",async(id)=>{
        const user =await User.findById(id);
        socket.emit("sendUser", user);
    })

    //editUser
    socket.on("editUser",async ({currentUser})=>{

        const edit =await User.findByIdAndUpdate({_id:currentUser?._id},currentUser)
        
        socket.emit("userUpdated",{success:true})
    })

    //edit message
    socket.on("editData", async ({id, data}) => {
        const userMessage = await Message.findByIdAndUpdate(
            id,
            {$set: {"messageContent": data}},
            {new: true}
        );
        socket.emit("msgUpdate",{userMessage})
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 7000 || process.env.PORT;
// cors origin
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.get('/', (req, res) => {
    res.send('api running')
})

server.listen(PORT, console.log(`server is running on PORT ${PORT}`))