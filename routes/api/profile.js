const express=require("express")
const router= express.Router();
const auth=require('../../middleware/auth');

const Profile=require('../../models/profile');


const {check,validationResult}=require('express-validator/check')



//@route get api/profile/me 
//desc: get current users profile
//access private

router.get('/me' ,auth, async (req,res)=>{

try {

    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name'],['avatar']);

    if(!profile){
        return res.status(400).json({msg:"there is no profule for this user"})
    };
    res.json(profile);

} catch (error) {
    console.error(error.message);
    res.status(500).send("Server error")
}

router.post('/' (req,res)=>){
    
}
});


module.exports=router;  