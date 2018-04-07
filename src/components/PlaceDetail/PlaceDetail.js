import React from 'react';
import {Modal,View,Text,Button,Image, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = props => {
  let modalContent = null;
  if(props.selectedPlace){
      modalContent = (
          <View>
        <Image source={props.selectedPlace.image} style={styles.placeImg}/>
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
        </View>
      );
  }
    return(
   <Modal visible= {props.selectedPlace !== null} animationType="slide"  onRequestClose={props.onModalClose}>
     <View style={styles.modalContainer}>
        {modalContent}
         <View>
             <TouchableOpacity onPress={props.onItemDeleted}>
             <View style={styles.deleteIcon}>
                 <Icon size={30} name="ios-trash" color="red" />
                 </View>
             </TouchableOpacity>
            
             <Button title="Close" onPress={props.onModalClose}/>
          </View>   
    </View>
   </Modal>
    );
 
};

const styles = StyleSheet.create({
    modalContainer: {
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

export default placeDetail;