import React, { Component } from "react";
import { Image, View, StatusBar, KeyboardAvoidingView } from "react-native";

import { 
  Container, 
  Button, 
  Content,
  Form,
  Item,
  Icon,
  Label,
  Input,
  H3, 
  Text, 
  Header, 
  Title, 
  Body, 
  Left, 
  Right } from "native-base";

import styles from "./styles";

import LoginBtn from './LoginBtn';

const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-tritongo.png");

const firebaseApp = require('../../firebase').firebaseApp;

class SignUpPage extends Component {
	// eslint-disable-line
     constructor(props){
      super(props);

      this.state = {
        email: '',
        password: '',
      }
    }
  
    signup() {
      firebaseApp.auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password).then(() => {
          alert('Your account was created!');
          this.props.navigation.navigate("CalendarWFooter");
      }).catch((error) => {
         switch(error.code){

          case "auth/email-already-in-use":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "auth/invalid-email":
            alert("The specified email is not a valid email.");
          break;

          case "auth/weak-password":
            alert("The password is too weak!");
          break;

          default:
            alert("Error creating user:");
        }
      });
    }
  
	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
                    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                      <View style={styles.logoContainer}>
                          <Image source={launchscreenLogo} style={styles.logo} />
                      </View>

                      <Content style={{marginTop: 110}} >

                        <Form style={{marginRight: 10}}>
                          <Item floatingLabel>
                            <Icon active name="person" style={{ color: "#fff"}} />
                            <Label style={{color: '#fff', marginHorizontal: 10 }}>Email</Label>
                            <Input style={{color: '#fff', marginHorizontal: 10 }} 
                              blurOnSubmit={true} autoCorrect={false} autoCapitalize={"none"} 
                              onChangeText={(text) => this.setState({email: text})}
                            />
                          </Item>
                          <Item floatingLabel>
                            <Icon active name="lock" style={{ color: "#fff" }} />
                            <Label style={{color: '#fff', marginLeft: 10}}>Password</Label>
                            <Input style={{color: '#fff', marginLeft: 10}} secureTextEntry
                              blurOnSubmit = {true} 
                              onChangeText={(text) => this.setState({password: text})}
                            />
                          </Item>
                        </Form>
                      </Content>
                    </KeyboardAvoidingView>
					<View style={{ marginBottom: 20 }}>
                      <View style={{marginBottom: 60, marginTop: 20}}><LoginBtn action={() => this.signup()}/></View>
                      {/*<Button rounded 
                          style={{margin: 20, justifyContent: 'center', alignSelf: 'stretch'}}
                          //onPress={() => this.props.navigation.navigate("./")}
                          onPress={() => this.props.navigation.navigate("CalendarWFooter")}
                      >
                          <Text>Sign In</Text>
                      </Button>*/}
                      <Button transparent small
                            style={{ alignSelf: "center" }}
                        >
                        <Text style={{color: '#fff', opacity:0.6 }}>Don't have a account? </Text>
                        <Text style={{color: '#fff'}}>Sign Up</Text>
                      </Button>
					</View>
				</Image>
			</Container>
		);
	}
}

export default SignUpPage;
