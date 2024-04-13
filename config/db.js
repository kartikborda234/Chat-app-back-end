const mongoose = require("mongoose");
const connectDB= async()=>{
    try {
        const conn= await mongoose.connect("mongodb+srv://kartikborda7:kartik2347@cluster0.jyygjku.mongodb.net/",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`mongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('db error:',error.message);
    }
}
module.exports=connectDB;