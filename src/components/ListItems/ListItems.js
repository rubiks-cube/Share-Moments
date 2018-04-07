import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';

const listItems = (props) => (
 <TouchableOpacity    onPress={props.onItemPressed}>
<View style={styles.listItems} >
    <Image resizeMode="cover" source={props.placeImg} style={styles.placeImg}/>
    <Text>{props.placeName}</Text>
</View>
</TouchableOpacity>
);

const styles = StyleSheet.create({
  listItems:{
      width:"100%",
      marginBottom:5,
      padding:10,
      backgroundColor:"#eee",
      flexDirection:"row",
      alignItems: "center"
  },
  placeImg:{
      marginRight:8,
      height:30,
      width:30
  }
});

export default listItems;