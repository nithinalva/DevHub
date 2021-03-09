const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth')
const {check,validationResult}= require('express-validator/check');
const Profile =require('../../models/profile');
const User=require('../../models/User');
const Post=require('../../models/post');



router.post('/',[auth,[
    check('text', 'text is required')
    .not()
    .isEmpty(),

]], async(req,res)=>{



    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }


try {
 
 const user =await User.findById(req.user.id).select('-password');

 const newPost= new Post({
     text:req.body.text,
     name:user.name,
     avatar:user.avatar,
     user:req.user.id
 })  

 const post=await newPost.save();
 res.json(post);


} catch (error) {
    console.error(error.message);
    res.status(500).send('server Error')    
}


})


//@route Get Api/Route
//desc Get all posts
//@access Private

router.get('/',auth, async (req,res)=>{             //GET all the posts 

    try {
            const posts= await Post.find().sort({date:-1});
            res.json(posts)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }

})


//@route Get Api/posts/:id
//desc Get all posts
//@access Private

router.get('/:id',auth, async (req,res)=>{            

    try {
            const posts= await Post.findById(req.params.id)
            res.json(posts)

            if(!posts)
            {
                return res.status(404).send("Post not found ")
            }

    } catch (error) {
        console.error(error.message)
        if(error.kind==='ObjectId')     //ObjectId its not a formatedId
        {
            return res.status(404).send("Post not found ")
        }
        res.status(500).send('server error')
    }

})


//@desc Delete a post 
//Route DELETE api/:id
router.delete('/:id',auth,async(req,res)=>{

    try {
        const posts= await Post.findById(req.params.id);
        

        //check if LOGGED USER is deleting the posts or not ?

            if(posts.user.toString()!==req.user.id){      
                      //but req.user.id is in string format bbut posts.user.id is is in object format so u need to convert it to String 
                return res.status(401).json({msg:'User Not Authorized'})
                

            }
            await posts.remove()
                        res.json({msg:'Post removed'})

        
    } catch (error) {
        
        console.error(error.message);

        if(error.kind==='ObjectId')     //ObjectId its not a formatedId
        {
            return res.status(404).send("Post not found ")
        }
        res.status(500).send('server Errror')

    }

})

module.exports= router;  