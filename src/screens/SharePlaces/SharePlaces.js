import React,{Component} from 'react';
import{View,Text,TextInput,Button,StyleSheet,ScrollView,Image} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';



class SharePlacesScreen extends Component {
    state={
        placeName:''
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
       this.setState({
           placeName:val
       });
    }

 placeAddedHandler = () => {
    
    if(this.state.placeName.trim() !== ""){
    this.props.onAddPlace(this.state.placeName);
    }
  }

    render(){
       return(
           <ScrollView >
           <View style={styles.container}>
               <MainText><HeadingText>Share a moment with us!</HeadingText></MainText>
               <PickImage/>
               <PickLocation/>
              <PlaceInput placeName={this.state.placeName} onTextChanged={this.placeNameChangedHandler}/>
               <View  style={styles.button}>
               <Button title="Share It" onPress={this.placeAddedHandler}/>
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

const mapDispatchToProps = dispatch => {
      return {
          onAddPlace: (placeName) => dispatch(addPlace(placeName))
      }
    }

export default connect(null, mapDispatchToProps)(SharePlacesScreen);