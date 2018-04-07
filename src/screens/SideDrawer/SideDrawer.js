import React, {Component} from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component{

    render(){
        return(
            <View style={[{width:Dimensions.get("window").width*0.7}, styles.container]}>
            <TouchableOpacity>
                <View style={styles.drawerItem}>
                    <Icon name="ios-log-out" size={30} color="#bbb" style={styles.drawerIcon}/>
                <Text> Sign Out</Text>
                </View>
          </TouchableOpacity>
                
            </View>
        );
    }
}
 const styles = StyleSheet.create({
   container:{
       paddingTop:22,
       backgroundColor: "white",
       flex:1
   },
   drawerItem:{
       flexDirection:"row",
       alignItems:"center",
       padding:10,
       backgroundColor:"#ccc"
   },
   drawerIcon:{
       marginRight:10
   }
 });
export default SideDrawer;