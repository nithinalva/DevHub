
///user registration is done here 

const express=require("express");
const { checkSchema } = require("express-validator");   //to check if theress any error in user's input
const router=express.Router();      //route from the server 
const {check,validationResult} =require('express-validator')
const gravatar=require("gravatar");
const bcrpyt=require("bcryptjs")
const jwt=require("jsonwebtoken")   //json web token for accesing the element by id 
const config=require("config")
const User=require('../../models/User');    // improting the schema  
//@route get api/users

//@route Post Api/Users
//descript :registers the user
//access public




router.post('/', [
    check('name','Name is requried').not().isEmpty(),      //check([field, message])       /// for ref visit https://express-validator.github.io/docs/custom-validators-sanitizers.html

    check('email','please insert a valid email').isEmail(),     //these are the validation middleware : 
    check('password',"please enter a password with 6 or more character").isLength({min:6})

], async (req,res)=>{
    
    const errors=validationResult(req);         //checks if tehres any erorrs in the req u make.. if yes it returns the array of req
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});       //returns a array of errors
    }
    
    const {name,email,password}=req.body; //object destructuring ...

    //req.body is nothing but { 
//   name: ' nithin s k',
//   email: 'nsk254@gmail.com',
//   password: 'MErcy2468!'
// }...
    try{
        //see if user exits

        let user=await User.findOne({email});
        if(user){

            res.status(400).json({errors: [{msg:'user already exists'}]})
        }
        const avatar=gravatar.url(email,{
            s:'200',        //size
            r:"pg",         //reading
            d:"mm"            //default image
        })


        user=new User({
            name,
            email,
            avatar,
            password
        })

            const salt=await bcrpyt.genSalt(10); //bcrypt returns the prmise func
            user.password=await bcrpyt.hash(password,salt);

            await user.save();          //saves the details into the schema

            //setting up the jwt
            const payload={

                user:{
                    id: user.id
                }

            };

                jwt.sign(payload,
                     config.get("JSONSecretKey"),
                {expiresIn:36000},
                 (err,token)=>{
                  if (err) throw err;
                  res.json({token});  

                });

              
        
    }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
 


    
    }


    // console.log(req.body);

    // console.log(req.body);              ///we get undefined bcz the boday parser is not yet initialized to we move back to server.js
    


    ///see if the user exists
     //if exits we want to send back a eeror
    //get user gravatar
    //encrypt password usinng bcrpyt
    //return jsonwebtoken




    
    // res.send('User successfully registered')          

});


module.exports=router; 