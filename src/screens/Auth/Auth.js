import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component{

    loginHandler = ()=>{
     startMainTabs();
    }
    render(){
        return(
          <View>
              <Text>Authh</Text>
              <Button onPress={this.loginHandler} title="Login"/>
          </View>
        );
    }
}

export default AuthScreen;