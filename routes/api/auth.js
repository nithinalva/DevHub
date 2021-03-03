const express=require('express')
const router=express.Router();
const auth=require("../../middleware/auth");    //middleware 
const User=require("../../models/User")
const config=require("config")
const jwt=require("jsonwebtoken")   //json web token for accesing the element by id 
const {check,validationResult} =require('express-validator')
const bcrypt=require("bcryptjs");

//@route get api/auth

router.get('/', auth, async (req,res)=>{

    try{
        const user=await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error")
    }

});



//user login


router.post('/', [
       //check([field, message])       /// for ref visit https://express-validator.github.io/docs/custom-validators-sanitizers.html

    check('email','please insert a valid email').isEmail(),     //these are the validation middleware : 
    check('password',"please enter a password with 6 or more character").exists()// check if password exists

], async (req,res)=>{
    
    const errors=validationResult(req);         //checks if tehres any erorrs in the req u make.. if yes it returns the array of req
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});       //returns a array of errors
    }
    
    const {email,password}=req.body; //object destructuring ...

    
//   email: 'nsk254@gmail.com',
//   password: 'MErcy2468!'
// }...
    try{
        //see if user exits

        let user=await User.findOne({email});
        if(!user){              //if user doesnt exists 

           return res.status(400).json({errors: [{msg:'invalid credentials'}]})
        }
      

        const isMatch= await bcrypt.compare(password,user.password);//compares the entered password with the user password on db]


if(!isMatch){

  return  res.status(400).json({errors: [{msg:'invalid credentials'}]});

}


          //saves the details into the schema

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


   

});


module.exports=router; 