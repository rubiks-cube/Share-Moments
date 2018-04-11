import {SET_AUTH_TOKEN,AUTH_REMOVE_TOKEN} from '../actions/actionTypes';

const initialToken = {
    token:null,
    expTime:null
}

const reducer = (state = initialToken ,action)=>{
    switch(action.type){
        case SET_AUTH_TOKEN:
        return{
           ...state,
           token:action.token,
           expTime:action.expTime
        }
        case AUTH_REMOVE_TOKEN:
        return{
            ...state,
            token:null,
            expTime:null
        }

        default:
        return state;
    }
 
}

export default reducer;