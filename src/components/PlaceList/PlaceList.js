import React from 'react';
import {FlatList,StyleSheet} from 'react-native';
import ListItems from '../ListItems/ListItems';

const placeList = props =>{
    
       
      
    return(
        <FlatList  data={props.places} style={styles.listContainer}
           renderItem = {(info) => (
            <ListItems  placeName={info.item.name} placeImg={info.item.image}
            onItemPressed={()=> props.onItemSelect(info.item.key)}/>
        )} />
    );
}

const styles = StyleSheet.create({
    listContainer:{
      width:"100%"
    }
});

export default placeList;