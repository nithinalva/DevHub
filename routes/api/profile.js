const express=require("express")
const router= express.Router();
const auth=require('../../middleware/auth');
const request=require('request');
const config=require('config');
const Profile=require('../../models/profile');
const fetch = require('node-fetch');

const {check,validationResult, body}=require('express-validator');
const User = require("../../models/User");



//@route get api/profile/me 
//desc: get current users profile
//access private

router.get('/me' ,auth, async (req,res)=>{

try {

    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name'],['avatar']);

    if(!profile){
        return res.status(400).json({msg:"there is no profile for this user"})
    };
    res.json(profile);

} catch (error) {
    console.error(error.message);
    res.status(500).send("Server error")
}

})
//@route post req to api/profile
//desc: create or update a user profile
//access private


router.post('/',[auth,[
    check('status','Status is required')
    .not()
    .isEmpty(),
    check('skills','skills is required')
    .not()
    .isEmpty()


]
], async (req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

  const{
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
  }=req.body   //we are actually pulling these thigns from req.body POST

  //build profile object

  const ProfileFields={}

  ProfileFields.user=req.user.id;               //insert or update a porfilefields
  if(company) ProfileFields.company=company;
  if(website) ProfileFields.website=website;
  if(location) ProfileFields.location=location;
  if(bio) ProfileFields.bio=bio;
  if(status) ProfileFields.status=status;
  if(githubusername) ProfileFields.githubusername=githubusername;
  if(skills){ ProfileFields.skills=skills.split(',').map(skils=>skils.trim());  //trim removes the whitespace
   
  //build social objectasn  , ,m m    
  ProfileFields.social={}
  if(youtube) ProfileFields.social.youtube=youtube;
    if(twitter) ProfileFields.social.twitter=twitter;
    if(facebook) ProfileFields.social.facebook=facebook;
    if(linkedin) ProfileFields.social.linkedin=linkedin;
    if(instagram) ProfileFields.social.instagram=instagram;


try {
    
    let profile= await Profile.findOne({user:req.user.id});     //Profile model  
    if(profile){
        //update the profile
        profile=await Profile.findOneAndUpdate({user:req.user.id},{
            $set:ProfileFields
        }, {new:true})

        return res.json(profile)
    }

    //if no existing profile
    profile=new Profile(ProfileFields)
    await profile.save();
    res.json(profile);

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
    
}


//   res.send("hello")
//     console.log(ProfileFields.skills)
}

});


//@route Get api/profile
//@desc get all profile


router.get('/',async(req,res)=>{

    try {
        
        const profiles=await Profile.find().populate('user',['name','avatar'])      //modelname=user from user propulate name and avatar
        res.json(profiles)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }



})



//@route Get api/profile/user/:userid
//@desc get profile by user ID


router.get('/user/:user_id',async(req,res)=>{           //user_id is a placeholder

    try {
        
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])      //modelname=user from user propulate name and avatar
        // 
        if(!profile){
            return res.status(400).json({msg:"no Profile found"})
        }

        res.json(profile)



    } catch (error) {
        console.error(error.message)
        // 
        if(error.kind==='ObjectId'){                //to avoid server error for everything errors
            return res.status(400).json({msg:"no Profile found"})
        }
        res.status(500).send('server error')
    }




})


//@route DElete api/profile
//@desc Delte Profile,user and posts
//@access private
//its private so use middlesware ..in public no need of middleware
router.delete('/',auth, async(req,res)=>{

    try {
        
        await Profile.findOneAndRemove({user:req.user.id})     //modelname=user from user propulate name and avatar
        //removing the user
        await User.findByIdAndRemove({_id:req.user.id})
        res.json({msg:"User Deleted"})

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }



})

//use put request for updating/adding a experience and education bcz u are actually updating the part of profile


//@access :PRivate

router.put('/experience',[auth,[
   check('title','ttile is required')
   .not()
   .notEmpty(),

   check('company', 'company is required')
   .not()
   .isEmpty(),
   check('from','From date is required')
   .not()
   .isEmpty(),

]],async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});

    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }=req.body;

                            //its similar to const newExp={}
                            //newExp.title=title
                            //newExp.company=company
    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        
        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp) ///pushing newExp's into profile.experience 
        await profile.save()
        res.json(profile);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")
        
    }




})

//@delete DELETE api/profile/experience/exp_id
//descp : Delete experience from profile


router.delete('/experience/:exp_id', auth, async (req,res)=>{           //:exp_id is a placeholder

    try {
        const profile=await Profile.findOne({user:req.user.id});

        //get remove index

        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);     ///doubt????????????????? 

        profile.experience.splice(removeIndex,1)
        await profile.save();
        res.send(profile)


        
    } catch (error) {
        console.error(error.message)
         res.status(500).send("server Error")
        
    }
   
   
  

})


//@desc :add education 
//@route api/profile/education

router.put('/education',[auth,[
    check('school','school is required')
    .not()
    .notEmpty(),
 
    check('degree', 'degree is required')
    .not()
    .isEmpty(),

    check('fieldofstudy', 'degree is required')
    .not()
    .isEmpty(),

      check('from','From date is required')
    .not()
    .isEmpty(),
 
 ]],async(req,res)=>{
 
     const errors=validationResult(req);
     if(!errors.isEmpty())
     {
         return res.status(400).json({errors:errors.array()});
 
     }
 
     const {
       school,
       degree,
       fieldofstudy,
       from,
       to,
       current,
       description
 
     }=req.body;
 
                             //its similar to const newExp={}
                             //newExp.title=title
                             //newExp.company=company
     const newEdu={
        
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
     }
 
     try {
         
         const profile=await Profile.findOne({user:req.user.id});
         profile.education.unshift(newEdu) ///pushing newExp's into profile.experience 
         await profile.save()
         res.json(profile);
 
     } catch (error) {
         console.error(error.message)
         res.status(500).send("server Error")
         
     }
 
 
 
 
 })
 
 //@delete DELETE api/profile/experience/edu_id
 //descp : Delete experience from profile
 
 
 router.delete('/education/:edu_id', auth, async (req,res)=>{           //:exp_id is a placeholder
 
     try {
         const profile=await Profile.findOne({user:req.user.id});
 
         //get remove index
 
         const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);     ///doubt????????????????? 
 
         profile.education.splice(removeIndex,1)
         await profile.save();
         res.send(profile)
 
 
         
     } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")
         
     }
    
    
   
 
 })




 //@route GET api/profile/github/:username
 //@desc get user repos from github
 //@access public bcz anyone can view

 router.get('/github/:username', (req,res)=>{

    try {
        const option ={
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('GithubClientId')}&client_secret=${config.get('GithubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}

        };

        request(option,(error,response,body)=>{
            if(error) console.error(error.message);

            if(response.statusCode!=200)
            {
               return res.status(404).json({message: 'no Github profile found'})
            }
            res.json(JSON.parse(body));     // you are getting from externel API
        })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server Error")
        
    }
 })

module.exports= router;  