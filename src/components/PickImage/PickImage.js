import React , {Component} from 'react';
import {View,Image,Button,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import img from '../../assets/beautiful-place.jpg';

class PickImage extends Component {
  state={
      pickedImage: null
  }

  reset = () =>{
      this.setState({
          pickedImage:null
      });
  }

  pickImagehandler= () =>{
      ImagePicker.showImagePicker({title:"Pick an Image", maxWidth: 600, maxHeight:400 }, res =>{
        if(res.didCancel){
            console.log("denied");
        }else if(res.error){
            console.log("err")
        }else{
            this.setState({
                pickedImage: {
                    uri:res.uri
                }
            });
            this.props.onImagePicked({uri:res.uri,base64:res.data})
        }
      });
  }

 render(){
     return(
         <View style={styles.container}>
        <View style={styles.placeholder}>
        <Image source={this.state.pickedImage} style={styles.preview}/>
        </View>
        <View style={styles.button}> 
        <Button title="Pick Image" onPress={this.pickImagehandler}/>
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