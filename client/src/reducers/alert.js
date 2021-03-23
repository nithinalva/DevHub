import {SET_ALERT, REMOVE_ALERT} from '../action/types';

 
const initialstate=[]


export default function(state= initialstate,action){
    
    const {type, payload}=action;           //action contains 2 manditory things payload and type 

    switch(type){
        case SET_ALERT:
            return [...state, payload];     //include a state already in there 

        case REMOVE_ALERT:
            return state.filter(alert=>(alert.id!==payload))

        default:
            return state
    }
} 