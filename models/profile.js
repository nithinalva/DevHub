const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,        //setting up the reference from the user model. objectid somethig whic is displayed on mong atlas id:objectID

                                                    //
        ref:'user'
    },

    company:{
        type:String
    },

    website:{
        type:String
    },

    location :{
        type:String
    },

    status:{
        type:String,
        required:true
    },

    skills:{
        type: [String],     //collection of skills so array of skills csv 
        required:true
    },

    bio:{
        type:String
    },
    githubusername:{
        type:String
    },

    //



    experience : [
      {
        title:{
            type:String,
            required:true
        },

        company:{
            type:String,
            required:true
        },

        location:{
            type:String,
            required:true
        },

        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        },

        curreny:{
            type:Boolean,
            default:false
        },
        description:{
            type:String
        }
    
    
    
    }


    ],

    education:[
        {
            school:{
                type:String,
                required:true
            },

            degree:{
                type:String,
                required:true
            },

            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
             


        }
    ],

    social:{

        youtube:{
            type:String
        },

        twitter:{
            type:String
        },

        facebook:{
            type:String
        },

        linkedin:{
            type:String
        },
        instagram:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }




})
module.exports=Profile=mongoose.model("profile",profileSchema)