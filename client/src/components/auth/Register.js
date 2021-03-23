import React,{Fragment,useState} from 'react'
import {Link} from'react-router-dom';
import {connect} from 'react-redux';        
import { defaults } from 'request';
import {setAlert} from '../../action/alert';
import {register} from '../../action/auth';     //register from actionss
import PropTypes from 'prop-types'



const  Register = (props) => {
    const [formData, setformData] = useState({name: '',
email:'',
password:'',
password2:'' });




const {name,email,password,password2}=formData

const onChange=e=>setformData({
    ...formData,[e.target.name]:e.target.value})
    
    const onSubmit=e=>{
        e.preventDefault();
        if(password!==password2){
         props.setAlert("Password didnot match",'danger');      //***** */
        }else{
           
            props.register({name,email,password})   //passin it to auth.js in action
        }
    }


    return (

      
    

        <Fragment>
           <h1 className="large text-primary">
        Sign up
    </h1>
    <p className="lead"><i className="fa fa-user"></i>
    Create Your Account
    </p>
    <form action="dashboard.html" className="form" onSubmit={e=>onSubmit(e)}>
    <div className="form-group"> 
        <input type="text" name='name' placeholder="name"   value={name} onChange={(e)=>onChange(e)}/>
    </div>


    <div className="form-group">
        <input type="email"   name="email" placeholder="Email Address"  value={email}  onChange={(e)=>onChange(e)}/>
         
        <small className="form-text">
            This site uses Gravatar, so if you want a profile image,use Gravatar email
        </small>

    </div>

    
    <div className="form-group">
        <input type="password" name="password" placeholder="Password"  value={password} onChange={(e)=>onChange(e)}/>
         

    </div>
    <div className="form-group">
        <input type="password" name="password2" placeholder=" Confirm Password" value={password2} onChange={(e)=>onChange(e)}/>
        
         

    </div>


    <input type="submit" value="Register" className="btn btn-primary"/>
    
    
    </form>
    <p className="my-1">
        Already have account? <Link to="/login">Sign in</Link>

    </p>
        </Fragment>
    )
}



Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register:PropTypes.func.isRequired
  };

export default connect(null, { setAlert,register })(Register);    /// important  using actions






//req using AXIOs

// import React,{Fragment,useState} from 'react'
// import axios from 'axios'

// export const Register = () => {
//     const [formData, setformData] = useState({name: '',
// email:'',
// password:'',            //iniitallly ill set eveyrthing to null and refered with values on each tag
// password2:'' });




// const {name,email,password,password2}=formData      

// const onChange=e=>setformData({
//     ...formData,[e.target.name]:e.target.value})        //on change event for change in input with name name
    
//     const onSubmit= async e=>{
//                                     //on submit 
//         e.preventDefault();
//         if(password!==password2){
//             console.log('password did not match')
//         }else{
            
//             const newUser={         
//                 name,
//                 email,
//                 password
//             }
//             try{
//                 const config={          //define a header 
                    
//                     headers:{
//                         'Content-Type':'application/json'
//                     }
                    
//                 }

//                 const body=JSON.stringify(newUser)      

//                 const res=await axios.post('/api/user',body,config);
//                 console.log(res.data);

//             }catch(err){

//                 console.log(err.res.data)
//             }
//         }
//     }


    

    // return (

      
    

    //     <Fragment>
    //        <h1 className="large text-primary">
    //     Sign up
    // </h1>
    // <p className="lead"><i className="fa fa-user"></i>
    // Create Your Account
    // </p>
    // <form action="dashboard.html" className="form" onSubmit={e=>onSubmit(e)}>
    // <div className="form-group"> 
    //     <input type="text" name='name' placeholder="name" required  value={name} onChange={(e)=>onChange(e)}/>
    // </div>


    // <div className="form-group">
    //     <input type="email"   name="email" placeholder="Email Address" required value={email}  onChange={(e)=>onChange(e)}/>
         
    //     <small className="form-text">
    //         This site uses Gravatar, so if you want a profile image,use Gravatar email
    //     </small>

    // </div>

    
    // <div className="form-group">
    //     <input type="password" name="password" placeholder="Password"  value={password} onChange={(e)=>onChange(e)}/>
         

    // </div>
    // <div className="form-group">
    //     <input type="password" name="password2" placeholder=" Confirm Password" value={password2} onChange={(e)=>onChange(e)}/>
        
         

    // </div>


    // <input type="submit" value="Register" className="btn btn-primary"/>
    
    
    // </form>
    // <p className="my-1">
    //     Already have account? <a href="login.html">Sign in</a>

    // </p>
    //     </Fragment>
    // )
// }
