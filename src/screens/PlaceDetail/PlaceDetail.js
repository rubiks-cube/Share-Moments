import React , {Component}from 'react';
import {View,Text,Button,Image, StyleSheet,TouchableOpacity,Platform,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index' ;
import MapView from 'react-native-maps';

class PlaceDetail extends Component{

    state ={
        viewMode:"portrait"
    }

    constructor(props){
        super(props);
        Dimensions.addEventListener("change",this.updateStyles);
    }
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    updateStyles = (dims) =>{
       this.setState({
           viewMode:dims.window.height>500?"portrait":"landscape"
       })
    }

    placeDeleteHandler = () =>{
      this.props.onDeletePlace(this.props.selectedPlace.key);
      this.props.navigator.pop({
        animated: true, 
        animationType: 'fade'
      });
    }

    render(){
    return(
   
     <View style={[styles.container,this.state.viewMode==="portrait"?
        styles.portraitContainer:styles.landscapeContainer]}>
        <View style={styles.PlaceDetailcontainer}>
       <View style={styles.subContainer}>
        <Image source={this.props.selectedPlace.image} style={styles.placeImg}/>
        </View>

        <View style={styles.subContainer}>
        <MapView initialRegion={{
            ...this.props.selectedPlace.location,
            latitudeDelta:0.01 ,
          longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height *0.01
          }}  style={styles.map}> 
            <MapView.Marker coordinate={this.props.selectedPlace.location}/>
        </MapView>
        </View>
        </View>

     <View  style={styles.subContainer}>

        <View>
        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>

         <View>
             <TouchableOpacity onPress={this.placeDeleteHandler}>
             <View style={styles.deleteIcon}>
                 <Icon size={30} name={Platform.OS==="android"?"md-trash":"ios-trash"} color="red" />
             </View>
             </TouchableOpacity>
            
         </View>  

      </View> 
    </View>
  
    );
}
 
};

const styles = StyleSheet.create({
    container: {
        margin:22,
        flex:1
    },
    portraitContainer:{
        flexDirection:"column"
    },
    landscapeContainer:{
        flexDirection:"row"
    },
    placeImg:{
        width:"100%",
        height:"100%",
        marginBottom:10

    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    placeName:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
        marginBottom:10
    },
    deleteIcon :{
        alignItems:"center"
    },
    subContainer:{
        flex:1,
        alignItems:"center",
        height:"90%"
    },
    PlaceDetailcontainer:{
        flex:2

    }
});

const mapDispatchToProps = dispatch =>{
    return{
        onDeletePlace : (key) => dispatch(deletePlace(key))
    }
}



export default connect(null,mapDispatchToProps)(PlaceDetail);