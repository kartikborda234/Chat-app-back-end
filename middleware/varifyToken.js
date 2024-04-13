const {secret_key}=require("../config/secretKey");
const jwt = require("jsonwebtoken");

const verifyToken=(req,res,next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token,secret_key,(err,valid)=>{
            if (err) {
                res.send({result:"Please provide valid token!",isExpired:true})
            }else{
                next();
            }
        })
    }
    else{
        res.send({result:"please add token with header"});
    }
}

module.exports= {verifyToken};