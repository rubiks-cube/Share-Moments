import React,{Component} from 'react';
import{View,Text,TextInput,Button,StyleSheet,ScrollView,Image,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';



class SharePlacesScreen extends Component {
    static navigatorStyle={
        navBarButtonColor:"blue"
    }
    
    state={
        controls:{
            placeName:{
                value:"",
                valid:false,
                touched:false,
                validationRules:{
                    notEmpty:true
                }
               },
           location:{
               value:null,
               valid:false
           },
           image:{
               value:null,
               valid:false
           }
        }

    };
    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event)=>{
        if(event.type === "NavBarButtonPress"){
            if(event.id==="SideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }

    }

    placeNameChangedHandler= (val)=>{
       this.setState(prevState => {
           return{
               controls:{
                   ...prevState.controls,
                   placeName:{
                       ...prevState.controls.placeName,
                       value:val,
                       valid: validate(val,prevState.controls.placeName.validationRules),
                       touched: true
                   }
               }
           }
       });
    }

 placeAddedHandler = () => {
    

    this.props.onAddPlace(this.state.controls.placeName.value
        ,this.state.controls.location.value,this.state.controls.image.value);

  }

  locationPickedHandler = location =>{
      this.setState(prevState =>{
          return{
          controls:{
              ...prevState.controls,
              location:{
                  value:location,
                  valid:true
              }
          }
        }
      })
  }

  pickedImageHandler = img =>{
    this.setState(prevState=>{
       return{
            controls:{
            ...prevState.controls,
            image:{
                value:img,
                valid:true
            }
        }
      }
    });
  }

    render(){
      let submitBtn = (
        <Button disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid
            ||! this.state.controls.image.valid} 
          title="Share It"  onPress={this.placeAddedHandler}/>

      );
      if(this.props.isLoading){
        submitBtn = <ActivityIndicator/>;
      }

       return(
           <ScrollView >
           <View style={styles.container}>
               <MainText><HeadingText>Share a moment with us!</HeadingText></MainText>
               <PickImage onImagePicked={this.pickedImageHandler}/>
               <PickLocation onLocationPick={this.locationPickedHandler}/>
              <PlaceInput placeData={this.state.controls.placeName} onTextChanged={this.placeNameChangedHandler}/>
               <View  style={styles.button}>
                 {submitBtn}
               </View>
             </View>
           </ScrollView>
       );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
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


const mapStateToProps = state =>{
    return{
        isLoading: state.ui.isLoading
    };
}

const mapDispatchToProps = dispatch => {
      return {
          onAddPlace: (placeName,location,image) => dispatch(addPlace(placeName,location,image))
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(SharePlacesScreen);