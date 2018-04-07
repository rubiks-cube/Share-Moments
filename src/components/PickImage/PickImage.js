import React , {Component} from 'react';
import {View,Image,Button,StyleSheet} from 'react-native';
import img from '../../assets/beautiful-place.jpg';

class PickImage extends Component {
 render(){
     return(
         <View style={styles.container}>
        <View style={styles.placeholder}>
        <Image source={img} style={styles.preview}/>
        </View>
        <View style={styles.button}> 
        <Button title="Pick Image" onPress={()=>alert(9)}/>
        </View >
        </View>
     );
 }
}

const styles=StyleSheet.create({
    container:{
        width:"100%",
        alignItems:"center"
    },
    placeholder:{
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"#ccc",
        width:"80%",
        height:250
    },
    button:{
        margin:8
    },
    preview:{
        width:"100%",
        height:"100%"
    }
});

export default PickImage;