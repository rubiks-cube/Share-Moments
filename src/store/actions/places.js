import {SET_PLACES,REMOVE_PLACE} from './actionTypes';
import {uiStartLoading,uiStopLoading} from './index';

export const addPlace = (placeName,location,image) =>{
     
    return dispatch => {

       dispatch(uiStartLoading());

        fetch("https://us-central1-moments-3393.cloudfunctions.net/storeImage",{
            method: 'POST',
            body:JSON.stringify({
                image:image.base64
            })
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res=>res.json())
        .then(response=>{

            const placeData ={
                name:placeName,
                location:location,
                image: response.imageUrl
            };
           return  fetch("https://moments-3393.firebaseio.com/places.json",{
                    method: 'POST',
                    body:JSON.stringify(placeData)
                })
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            alert("Uploaded successfully!");
            dispatch(uiStopLoading());
        });

    };  
   
}

export const deletePlace = (key) =>{
    return  dispatch => {
        dispatch(removePlace(key));
        fetch("https://moments-3393.firebaseio.com/places/"+key+".json",{
            method: 'DELETE',
        })
        .catch(err=>{
            console.log(err);
            alert("Something went wrong, please try again!");
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            alert("Delete successfully!");
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
    return dispatch =>{
        fetch("https://moments-3393.firebaseio.com/places.json")
        .catch(err=>{
            console.log(err);
            alert("Fetching failed :/");
        })
        .then(res => res.json())
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
    }
};

 