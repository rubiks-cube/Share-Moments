import React,{Component} from 'react';
import{View,Text,TouchableOpacity,StyleSheet,Animated} from 'react-native';
import {connect} from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlacesScreen extends Component {
    static navigatorStyle={
        navBarButtonColor:"blue"
    }

    state ={
        placesLoaded:false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }

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

    placesLoadedHandler =()=>{
      Animated.timing(this.state.placesAnim,{
          toValue:1,
          duration:500,
          useNativeDriver:true

      }).start();
    }


    placesSearchHandler=()=>{
      Animated.timing(this.state.removeAnim,{
          useNativeDriver:true,
          toValue:0,
          duration:500
      }).start(()=>{
          this.setState({placesLoaded:true});
         this.placesLoadedHandler();
      });
    }

    itemSelectedHandler= key =>{
        const selPlace = this.props.places.find(place =>{
            return place.key==key;
        });

        this.props.navigator.push({
            screen:'share-moments.PlaceDetailScreen',
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    }
    render(){
        let content = (
            <Animated.View style={{
                opacity:this.state.removeAnim,
                transform:[
                    {
                        scale:this.state.removeAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[12,1]
                        })
                    }
                ]}}>
            <TouchableOpacity onPress={this.placesSearchHandler}>
                <View style={styles.searchBtn}>
                    <Text  style={styles.searchBtnText}>Find Places</Text>
                </View>
            </TouchableOpacity>
            </Animated.View>
        );

        if(this.state.placesLoaded){
            content =(
                <Animated.View style={{opacity:this.state.placesAnim}}>
                <PlaceList places={this.props.places}  onItemSelect={this.itemSelectedHandler}/>
                </Animated.View>
              );
        }
       return(
           <View style={this.state.placesLoaded?null:styles.btnContainer}>
               {content}
        </View>
       );
    }
}

const styles = StyleSheet.create({

    btnContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    searchBtn:{
      borderColor:"blue",
      borderWidth:3,
      borderRadius:50,
      padding:20
    },
    searchBtnText:{
        color:"blue",
        fontWeight:"bold",
        fontSize:22
    }
})

const mapStateToProps = state => {
      return {
        places: state.places.places,
        
      }
    }
export default connect(mapStateToProps)(FindPlacesScreen);