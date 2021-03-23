//adding global header 

import axios from 'axios'



const setAuthToken=token=>{

    if(token)
    {
        axios.defaults.headers.common['x-auth-token']=token;        //default header 

    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;