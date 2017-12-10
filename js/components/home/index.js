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


class Home extends Component {
	// eslint-disable-line
    constructor(props){
      super(props);

      this.state = {
        email: '',
        password: '',
      }
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
                <Button transparent small
                  style={{ opacity:0.6, alignSelf: 'flex-end' }}
                  onPress={()=> this.props.navigation.navigate("ForgetPage")}
                >
                  <Text style={{color: '#fff'}}>Forget?</Text>
                  <Icon active name="refresh" style={{ color: "#fff" }} />
                </Button>
              </Content>
            </KeyboardAvoidingView>
            <View style={{ marginBottom: 20 }}>
              <View style={{marginBottom: 60, marginTop: 20}}>
                <LoginBtn password = {this.state.password} email = {this.state.email} 
                  action={() => this.props.navigation.navigate("CalendarWFooter")} />
              </View>
              <Button transparent small
                    style={{ alignSelf: "center" }}
                    onPress={()=> this.props.navigation.navigate("SignUpPage")}
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

export default Home;
