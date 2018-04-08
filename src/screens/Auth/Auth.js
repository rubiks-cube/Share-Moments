import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet,ImageBackground,
    Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {connect} from 'react-redux';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImg from '../../assets/background.jpg';
import validate from '../../utility/validation';
import {tryAuth} from '../../store/actions/index'

class AuthScreen extends Component{
    state={
       viewMode: Dimensions.get('window').height>500? "portrait":"landscape",
       authMode:"login",
       controls:{
           email:{
               value:"",
               valid:false,
               validationRules:{
                   isEmail:true
               },
               touched:false
           },
           password:{
            value:"",
            valid:false,
            validationRules:{
                minLen:6
            } ,
            touched:false
           },
           confirmPassword:{
            value:"",
            valid:false,
            validationRules:{
                equalTo:'password'
            },
            touched:false
           }
       }
    
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener("change",  this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }

    updateStyles = (dims)=>{
        this.setState({
            viewMode: dims.window.height>500?"portrait":"landscape"
           })
    }

    loginHandler = ()=>{
        const authData = {
            email: this.state.controls.email.value,
            password:this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    }

    switchAuthModeHandler =()=>{
        this.setState( prevState=>{
            return{
            authMode: prevState.authMode === "login"? "signup":"login"
            };
        });
    }

    updateInputState = (key,value) =>{
        let connectedValue ={};
        if(this.state.controls[key].validationRules.equalTo){
          const equalControl = this.state.controls[key].validationRules.equalTo;
          const equalValue= this.state.controls[equalControl].value;
          connectedValue = {
              ...connectedValue,
              equalTo: equalValue
          }
        }
        if(key==='password'){
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return{
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid: key ==='password'?validate(prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,connectedValue):
                        prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value:value,
                        valid:validate(value,prevState.controls[key].validationRules,connectedValue),
                        touched:true
                    }
                }
            }
        })
        console.log(this.state.controls['confirmPassword'].valid);
    }

    render(){
      
        let headingText = null;
        let confirmPasswordControl = null;
        if(this.state.viewMode === "portrait"){
            headingText=(
                <MainText>
                <HeadingText >Please {this.state.authMode==="login"?"Login":"SignUp"}</HeadingText>
                </MainText>
            );
        }

        if(this.state.authMode=== "signup"){
            confirmPasswordControl=(
                <View  style={this.state.viewMode==="portrait"? 
              styles.portraitPwdWrapper:styles.landscapePwdWrapper}>
              <DefaultInput  placeholder="Confirm Password"  valid={this.state.controls.confirmPassword.valid}
               touched={this.state.controls.confirmPassword.touched} secureTextEntry={true}
               value={this.state.controls.confirmPassword.value}
                onChangeText={(val)=>this.updateInputState('confirmPassword',val)} />
              </View>
            );
        }
        return(
            <ImageBackground source={backgroundImg} style={styles.backgroundImg}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
          
               {headingText}
             
              <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>
              Switch to {this.state.authMode==="login"?"Signup":"Login"}</ButtonWithBackground>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputContainer}>

              <DefaultInput placeholder="Email" style={styles.input}  valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}  autoCapitalize="none" autoCorrect={false} keyboardType="email-address"
              value={this.state.controls.email.value} onChangeText={(val)=>this.updateInputState('email',val)}/>

              <View style={this.state.viewMode==="portrait" || this.state.authMode ==="login"?
              styles.portraitPasswordContainer:styles.landscapePasswordContainer}>

              <View style={this.state.viewMode==="portrait" || this.state.authMode ==="login"? 
              styles.portraitPwdWrapper:styles.landscapePwdWrapper}>
              <DefaultInput placeholder="Password" valid={this.state.controls.password.valid}
              secureTextEntry={true}
               touched={this.state.controls.password.touched}
               value={this.state.controls.password.value}
                onChangeText={(val)=>this.updateInputState('password',val)} />
              </View>

             {confirmPasswordControl}

              </View>
              </View>
              </TouchableWithoutFeedback>
              <ButtonWithBackground color="#29aaf4"onPress={this.loginHandler}
                disabled={!this.state.controls.password.valid ||
                     !this.state.controls.confirmPassword.valid  && this.state.authMode==="signup"|| 
                !this.state.controls.email.valid}>
              Submit</ButtonWithBackground>
             
          </KeyboardAvoidingView>
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
    },
    landscapePasswordContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitPasswordContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapePwdWrapper:{
        width:"45%"
    },
    portraitPwdWrapper:{
        width:"100%"
    }

});

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (authData) => dispatch(tryAuth(authData))
    };
}

export default connect(null,mapDispatchToProps)(AuthScreen);