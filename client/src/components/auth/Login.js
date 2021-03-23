import React,{Fragment,useState} from 'react';
import {Link} from'react-router-dom';
import {connect} from 'react-redux';    //implementing redux 
import PropTypes from 'prop-types'  
import {login } from '../../action/auth'   //get login from auth action



 const Login = (props) => {
    const [formData, setformData] = useState({
email:'',
password:''});




const {email,password}=formData

const onChange=e=>setformData({
    ...formData,[e.target.name]:e.target.value})
    
    const onSubmit= async e=>{
      
            e.preventDefault();
            props.login(email,password)
        
    }


    return (

      
    

        <Fragment>
           <h1 className="large text-primary">
        Sign In
    </h1>
    <p className="lead"><i className="fa fa-user"></i>
    Sign into Your Account
    </p>
    <form action="dashboard.html" className="form" onSubmit={e=>onSubmit(e)}>
    


    <div className="form-group">
        <input type="email"   name="email" placeholder="Email Address" required value={email}  onChange={(e)=>onChange(e)}/>
         
        
    </div>

    
    <div className="form-group">
        <input type="password" name="password" placeholder="Password"  value={password} onChange={(e)=>onChange(e)}/>
         

    </div>
    


    <input type="submit" value="Login" className="btn btn-primary"/>
    
    
    </form>
    <p className="my-1">
      Dont have an account? <Link to="/register">Sign up</Link>

    </p>
        </Fragment>
    )
}

Login.propTypes={       //redux defining the proptype
    login:PropTypes.func.isRequired,
} 


export default connect(null,{ login })(Login);