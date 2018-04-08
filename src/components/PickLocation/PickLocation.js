import React , {Component} from 'react';
import {View,Image,Button,StyleSheet,Text,Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import img from '../../assets/beautiful-place.jpg';

class PickLocation extends Component {

    state ={
      focusedRegion:{
          latitude: 26.655 ,
          longitude: 84.915,
          latitudeDelta:0.01 ,
          longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height *0.01
      },
      locationChosen:false
    };



    pickLocationHandler = event =>{
      const coords = event.nativeEvent.coordinate;
      this.map.animateToRegion({
          ...this.state.focusedRegion,
          latitude: coords.latitude,
          longitude: coords.longitude
      });
     
      this.setState(prevState =>{
        
          return{
              focusedRegion: {
              ...prevState.focusedRegion,
              latitude: coords.latitude,
              longitude: coords.longitude
              }, 
              locationChosen:true
          }
      });

      this.props.onLocationPick({
          latitude:coords.latitude,
          longitude:coords.longitude
      });
      
    }

    getLocationHandler = () =>{
        navigator.geolocation.getCurrentPosition(pos =>{
        const coordsEvent  = {
            nativeEvent:{
                coordinate:{
                    latitude:pos.coords.latitude,
                    longitude:pos.coords.longitude
                }
            }
           };
           this.pickLocationHandler(coordsEvent);
        },
        err=>{
          console.log(err);
       });
    }

 render(){
     let marker =null;
     if(this.state.locationChosen){
         marker =<MapView.Marker coordinate={this.state.focusedRegion}/>
     }
     return(
         <View style={styles.container}>
        <MapView initialRegion={this.state.focusedRegion}   style={styles.map}
          onPress={this.pickLocationHandler}  ref={ref=> this.map=ref}>
          {marker}
          </MapView>
        <View  style={styles.button}> 
            <Button title="Locate Me" onPress={this.getLocationHandler}/>
         </View>
        </View>
     );
 }
}

const styles=StyleSheet.create({
    container:{
        width:"100%",
        alignItems:"center"
    },
    map:{
    
        width:"100%",
        height:250
    },
    button:{
        margin:8
    }
});

export default PickLocation;