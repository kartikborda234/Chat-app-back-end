const {secret_key}=require("./secretKey");
const jwt = require("jsonwebtoken");
const generateToken=(id,email)=>{
    const token = jwt.sign({id,email},secret_key,{
        expiresIn:"3h"
    });

    const generateNewToken = 'Bearer' +" "+ token;

    return generateNewToken;
}
module.exports={generateToken};