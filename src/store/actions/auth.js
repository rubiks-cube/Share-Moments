import {AsyncStorage} from 'react-native';
import App from '../../../App';
import {TRY_AUTH, SET_AUTH_TOKEN,AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading,uiStopLoading}  from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { Promise } from 'core-js';

export const tryAuth = (authData,authMode) => {
    return dispatch =>{
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBzo6BlHhTKWEyDEcBpdaJI1BpnFNZXHzU";
        if(authMode==="signup"){
         url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBzo6BlHhTKWEyDEcBpdaJI1BpnFNZXHzU";
        }
     
        dispatch(uiStartLoading());
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                email:authData.email,
                password:authData.password,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(uiStopLoading());
            alert('Auth failed, try again!');
        })
        .then(res=>res.json())
        .then(response => {
            dispatch(uiStopLoading());
            if(response.error){
              alert(response.error.message);
            }else{
              dispatch(storeAuthToken(response.idToken,response.expiresIn,response.refreshToken));
               startMainTabs();
            }
           
         
        });

    }
}

export const storeAuthToken = (token,expiresIn,refreshToken) =>{
   return dispatch=>{
      
       const now = new Date();
       const expiryTime = now.getTime() + expiresIn*1000;
       dispatch(authTokenSet(token, expiryTime));
       AsyncStorage.setItem("auth-token",token);
      AsyncStorage.setItem("expTime-token",expiryTime.toString());
       AsyncStorage.setItem("auth-refreshToken",refreshToken);
   }
}

export const authTokenSet = (token,expTime) =>{
    return{
        type:SET_AUTH_TOKEN,
        token:token,
        expTime:expTime
    }
}


export const getAuthToken = ()=>{
    return (dispatch,getState) =>{
        const promise = new Promise((resolve,reject)=>{
            const token = getState().auth.token;
            const expTime = getState().auth.expTime;
            if(!token || new Date(expTime) <= new Date()){
                let fetchedToken;
                AsyncStorage.getItem("auth-token")
                .catch(err=>reject())
                .then(token =>{
                    fetchedToken=token;
                    if(!token){
                        reject();
                        return;
                    }
                   return  AsyncStorage.getItem("expTime-token");
                })
                .then (exp =>{
                    const parsedExp =  new Date(parseInt(exp));
                    const now = new Date();
                    if (parsedExp>now){
                    dispatch(authTokenSet(fetchedToken));
                    resolve(fetchedToken);
                    }else{
                        reject();
                    }
                })
                .catch(err=>console.log(err));   
                
            }else{
                resolve(token);
            }
        });

       return  promise
       .catch(err=>{
           return  AsyncStorage.getItem("auth-refreshToken")
            .then(refreshToken => {
              return fetch("https://securetoken.googleapis.com/v1/token?key=AIzaSyBzo6BlHhTKWEyDEcBpdaJI1BpnFNZXHzU",{
                 method:"POST",
                 headers:{
                     'Content-Type':'application/x-www-form-urlencoded'
                 },
                 body:'grant_type=refresh_token&refresh_token='+ refreshToken
             })
            })
            .then(res=>res.json())
            .then(resp=>{
                if(resp.id_token){
                  dispatch(storeAuthToken(resp.id_token,resp.expires_in,resp.refresh_token));
                  return resp.id_token;
                }else{
                    dispatch(authClearStorage());
                }
            });
        
           
        })
        .then(token =>{
            if(!token){
                throw   new Error();
            }else{
              return token;
            }
        } );

        
      
    }
}


export const authAutoSignin = ()=>{
    return dispatch =>{
        dispatch(getAuthToken())    
        .then(token => {
            startMainTabs();
        })
        .catch(err => console.log("Failed to fetch"))
    }
}


export const authClearStorage = ()=>{
    return dispatch =>{
   AsyncStorage.removeItem('auth-token');
    AsyncStorage.removeItem('expTime-token');
   return  AsyncStorage.removeItem('auth-refreshToken');
    }
}



export const authLogout =()=>{
    return dispatch =>{
        dispatch(authClearStorage())
        .then(()=>{
            App();
        });
      dispatch(authRemoveToken());
    }
}

export const authRemoveToken = () => {
    return{
        type:AUTH_REMOVE_TOKEN
    }
}





