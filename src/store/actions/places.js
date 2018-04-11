import {SET_PLACES,REMOVE_PLACE,PLACE_ADDED,START_ADD_PLACE} from './actionTypes';
import {uiStartLoading,uiStopLoading,getAuthToken} from './index';

export const startAddPlace =() =>{
    return {
        type:START_ADD_PLACE
    }
}

export const addPlace = (placeName,location,image) =>{
     
    return dispatch => {
         let authToken;
       dispatch(uiStartLoading());
       dispatch(getAuthToken())
       .catch(()=>{
        alert("no valid token found");
        })
        .then(token =>{
            authToken =token;
           return fetch("https://us-central1-moments-3393.cloudfunctions.net/storeImage",{
            method: 'POST',
            body:JSON.stringify({ image:image.base64 }),
            headers:{
                "Authorization":"Bearer "+ authToken
            }
           })
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res=>{
            if(res.ok){
             return res.json();
            }else{
                throw new Error();
            }
            
        })
        .then(response=>{

            const placeData ={
                name:placeName,
                location:location,
                image: response.imageUrl,
                imagePath:response.imagePath
            };
           return  fetch("https://moments-3393.firebaseio.com/places.json?auth=" + authToken,{
                    method: 'POST',
                    body:JSON.stringify(placeData)
                })
        })
       
        .then(res=>{
            if(res.ok){
             return res.json();
            }else{
                throw new Error();
            }
            
        })
        .then(response=>{
            console.log(response);
            alert("Uploaded successfully!");
            dispatch(uiStopLoading());
            dispatch(placeAdded());
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        });

    };  
   
}

export const placeAdded = () =>{
    return {
        type: PLACE_ADDED
    }
}

export const deletePlace = (key) =>{
    return  (dispatch) => {
        dispatch(getAuthToken())
        .catch(()=>{
            alert("no valid token found");
        }) 

        .then(token =>{
           
          dispatch(removePlace(key));
       
         return   fetch("https://moments-3393.firebaseio.com/places/"+key+".json?auth="+token,{
            method: 'DELETE'
             })
        })
       
        .then(res=>{
            if(res.ok){
             return res.json();
            }else{
                throw new Error();
            }
            
        })
        .then(response=>{
            console.log(response);
            alert("Delete successfully!");
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
        });

    };
}

export const removePlace = key =>{
    return{
        type:REMOVE_PLACE,
        key:key
    }
}

export const setPlaces = places =>{
   return{
       type:SET_PLACES,
       places:places
   }
}

export const getPlaces = () =>{
    return (dispatch) =>{
       dispatch(getAuthToken())
       .catch(()=>{
        alert("no valid token found");
       }) 
       .then(token =>{
          return  fetch("https://moments-3393.firebaseio.com/places.json?auth="+token)
       })
       
      .then(res => {
        if(res.ok){
         return res.json();
        }else{
            throw new Error();
        }
        
    })
      .then(response =>{
            const places = [];
            for (let key in response){
                places.push({
                    ...response[key],
                    image:{
                        uri:response[key].image
                    },
                    key:key
                });
            }
            dispatch(setPlaces(places))
        })
        .catch(err=>{
            console.log(err);
            alert("Fetching failed :/");
        });
    }
};

 