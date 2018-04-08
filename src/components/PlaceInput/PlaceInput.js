import React,{Component} from 'react';
import {View,TextInput,Button,StyleSheet}  from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput= props=>(
        
         <DefaultInput placeholder="Place Name" value={props.placeData.value}  valid={props.placeData.valid}
         touched={props.placeData.touched}
         onChange={(event)=>props.onTextChanged(event.nativeEvent.text)}/>
   
      );  
  


export default placeInput;

