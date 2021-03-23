import axios from 'axios';

import {  REGISTER_SUCCESS, REGISTER_FAIL ,USER_LOADED ,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS} from "../action/types";     //section 8 :40 
import setAuthToken from '../util/setAuthToken';
import {setAlert } from './alert';









//load user 
export const loadUser=()=>async dispatch=>{     


    if(localStorage.token){

        setAuthToken(localStorage.token)        //to util/ setAuthToken(token)
    }


    try{
        const res= await axios.get('api/Authentication');
        dispatch({
            type: USER_LOADED,
            payload:res.data
        })

    }catch(err){

        dispatch({
            type:AUTH_ERROR
        })

    }

}








//Register user 

export const register=({name,email,password})=> async dispatch=>{

    const config ={
        headers : {
            'Content-Type': 'application/json'
        }
    }


    const body= JSON.stringify({name,email,password})

    try{

        const res=  await axios.post('./api/user', body,config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload:res.data        //token back on a successfull response 
        })

        dispatch(loadUser()); //it runs immediately
    }catch(err){

        const errors =err.response.data.errors;
            if(errors){

                errors.forEach(error => {
                    dispatch(setAlert(error.msg ,'danger'));
                    
                });


            }
    
        dispatch({
            type: REGISTER_FAIL,

        })

    }
}



//login user 



export const login=(email,password)=> async dispatch=>{

    const config ={
        headers : {
            'Content-Type': 'application/json'
        }
    }


    const body= JSON.stringify({email,password})

    try{

        const res=  await axios.post('./api/Authentication', body,config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data        //token back on a successfull response 
        })
        
        dispatch(loadUser());

    }catch(err){

        const errors =err.response.data.errors;
            if(errors){

                errors.forEach(error => {
                    dispatch(setAlert(error.msg ,'danger'));
                    
                });


            }
    
        dispatch({
            type: LOGIN_FAIL,

        })

    }
}