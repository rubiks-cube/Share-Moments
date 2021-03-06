import React, {Component} from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'

import {authLogout} from '../../store/actions/index';

class SideDrawer extends Component{

    render(){
        return(
            <View style={[{width:Dimensions.get("window").width*0.7}, styles.container]}>
            <TouchableOpacity onPress={this.props.onLogout}>
                <View style={styles.drawerItem}>
                    <Icon name={Platform.OS==="android"?"md-log-out":"ios-log-out"}
                     size={30} color="#bbb" style={styles.drawerIcon}/>
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
       flex:1,
       justifyContent:"center"
   },
   drawerItem:{
       flexDirection:"row",
       alignItems:"center",
       padding:10,
       backgroundColor:"#ccc",
       
   },
   drawerIcon:{
       marginRight:10
   }
 });

 const mapDispatchToProps = dispatch =>{
     return{
         onLogout :()=>dispatch(authLogout())
     }
 }
export default connect(null,mapDispatchToProps)(SideDrawer);