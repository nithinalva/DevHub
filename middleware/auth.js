   
    //setting up a middleware fucntion

const jwt=require('jsonwebtoken');
const config=require("config");
const { modelName } = require('../models/User');

module.exports=function(req,res,next){

        //get token from header 
        const token=req.header('x-auth-token');
        //check if no token


        if(!token){
            return res.status(401).json({msg:"no token authorization denied"});
        }

        try{

            const decoded=jwt.verify(token,config.get("JSONSecretKey"));
            req.user=decoded.user;
            next();



        }catch(err){
            res.status(401).json({msg:"token is not valid"})

        }



}