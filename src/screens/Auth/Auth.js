import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet,ImageBackground} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImg from '../../assets/background.jpg';

class AuthScreen extends Component{

    loginHandler = ()=>{
     startMainTabs();
    }
    render(){
        return(
            <ImageBackground source={backgroundImg} style={styles.backgroundImg}>
          <View style={styles.container}>
          
              <MainText>
              <HeadingText >Please Login</HeadingText>
              </MainText>
             
              <ButtonWithBackground color="#29aaf4" onPress={()=>alert(7)}>Switch to Login</ButtonWithBackground>
              <View style={styles.inputContainer}>
              <DefaultInput placeholder="Email" style={styles.input}/>
              <DefaultInput placeholder="Password" />
              <DefaultInput  placeholder="Confirm Password" />
              </View>
              <ButtonWithBackground color="#29aaf4"onPress={this.loginHandler}>Submit</ButtonWithBackground>
             
          </View>
          </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    inputContainer:{
        width:"80%"
    },
    backgroundImg:{
        width:"100%",
        flex:1
    },
    input:{
        backgroundColor:"#bbb",
        borderColor:"#bf5567"
    }
});

export default AuthScreen;