import React from 'react';
import { StyleSheet, View } from 'react-native';
import placeImg from './src/assets/beautiful-place.jpg';
import {connect} from 'react-redux';
import {addPlace,deselectPlace,selectPlace,deletePlace} from './src/store/actions';


import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

 class App extends React.Component {

 

 placeAddedHandler = (placeName)=>{
 
     this.props.onAddPlace(placeName);
     
   
 }

 placeSelectedHandler = key =>{
   this.props.onSelectPlace(key);
 
 }

 placeDeleteHandler = ()=>{
  this.props.onDeletePlace();
 }

 onModalCloseHandler =()=>{
   this.props.onDeselectPlace();
 }

  render() {
    
    return (
      <View style={styles.container}>
       <PlaceDetail selectedPlace={this.props.selectedPlace} 
       onItemDeleted={this.placeDeleteHandler} onModalClose={this.onModalCloseHandler}/>
       <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
       <PlaceList places={this.props.places} onItemSelect= {this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});


const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace : (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace : (key) => dispatch(selectPlace(key)),
    onDeselectPlace: ()=> dispatch(deselectPlace())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
