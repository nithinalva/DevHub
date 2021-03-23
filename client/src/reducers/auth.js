
import {  REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL } from "../action/types";     


//registering the user 

const initialState={


    token: localStorage.getItem('token'),   //storing the token
    isAuthenticated :null,      //later set it to true on a successfull response 
    loading:true,    //once loaded set it to false
    user:null       //will stpre the user values from the backend

}
export default function(state=initialState,action) {

 const { type,payload}=action;

switch(type){

    case USER_LOADED:
        return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user:payload    //payload contains user's details 

        }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
        localStorage.setItem('token',payload.token);
        return{
            ...state,       // state is immutable whatver is currently in state 
            ...payload,
            isAuthenticated:true,
            loading:false       //bcz we got the response already 
        }

      
     case REGISTER_FAIL:  
     case AUTH_ERROR:
    case LOGIN_FAIL:
     localStorage.removeItem('token')
     return{
        ...state,       // state is immutable
        token:null,
        isAuthenticated:true,
        loading:false
    }

  

     default:
         return state

}

}