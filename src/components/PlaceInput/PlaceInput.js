import React,{Component} from 'react';
import {View,TextInput,Button,StyleSheet}  from 'react-native';

class PlaceInput extends Component{
    state = {
        placeName:''
      };
     
      placeNameChangedHandler = (val) => {
        this.setState({placeName:val});
      }
     
      placeSubmitHandler = ()=>{
        if(this.state.placeName.trim()==""){
          return;
        } 

        this.props.onPlaceAdded(this.state.placeName);
      }

  render(){
      return(
        <View style={styles.inputContainer}>
        <TextInput style={styles.placeInput} value={this.state.placeName} 
        onChangeText= {this.placeNameChangedHandler}  placeholder="*Place"/>
         <Button style={styles.placeBtn} title="Add" onPress={this.placeSubmitHandler}/>
       </View>
      );
  }
}

export default PlaceInput;

const styles = StyleSheet.create({
    inputContainer: {
        width:"100%",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      placeInput:{
         width:"70%"
      },
      placeBtn:{
         width:"30%"
      },
});