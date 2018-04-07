import React , {Component}from 'react';
import {View,Text,Button,Image, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from '../../store/actions/index' ;

class PlaceDetail extends Component{

    placeDeleteHandler = () =>{
      this.props.onDeletePlace(this.props.selectedPlace.key);
      this.props.navigator.pop({
        animated: true, 
        animationType: 'fade'
      });
    }

    render(){
    return(
   
     <View style={styles.container}>
       <View>
        <Image source={this.props.selectedPlace.image} style={styles.placeImg}/>
        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
             <TouchableOpacity onPress={this.placeDeleteHandler}>
             <View style={styles.deleteIcon}>
                 <Icon size={30} name="ios-trash" color="red" />
             </View>
             </TouchableOpacity>
            
         </View>   
    </View>
  
    );
}
 
};

const styles = StyleSheet.create({
    container: {
        margin:22
    },
    placeImg:{
        width:"100%",
        height:200,
        marginBottom:10

    },
    placeName:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28,
        marginBottom:10
    },
    deleteIcon :{
        alignItems:"center"
    }
});

const mapDispatchToProps = dispatch =>{
    return{
        onDeletePlace : (key) => dispatch(deletePlace(key))
    }
}

export default connect(null,mapDispatchToProps)(PlaceDetail);