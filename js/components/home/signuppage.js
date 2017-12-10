// @flow
import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Left,
  Right,
  Footer
} from "native-base";

import styles from "./styles";

class SignUpPags extends Component {
  
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
        Toast.show({
          text: "Account created! Now you can login :D",
          duration: 2500,
          position: "top",
          textStyle: { textAlign: "center" },
          type: "success"
        });
        this.props.navigation.goBack();
    }).catch((error) => {
      Toast.show({
        text: error.message,
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "danger"
      });
    });
  }

  render() {
    return (
      <Container>
        <Image
          source={require("../../../img/signup-bg.png")}
          style={styles.background}
        >
          <Content padder>
            <Text style={styles.signupHeader}>CREATE ACCOUNT</Text>
            <View style={styles.signupContainer}>
              
              <Item style={{marginBottom: 20}} rounded>
                <Icon active style={{marginLeft: 10, color: "#fff"}} name="mail" />
                <Input style={{ color: "#fff"}} placeholderTextColor = "#FFF" placeholder="Email" 
                  blurOnSubmit={true} autoCorrect={false} autoCapitalize={"none"}
                  onChangeText={(text) => this.setState({email: text})}
                  />
              </Item>
              
              <Item style={{marginBottom: 20}} rounded>
                <Icon active style={{marginLeft: 10, color: "#fff"}} name="lock" />
                <Input style={{ color: "#fff"}} placeholderTextColor = "#FFF" placeholder="Password" 
                  blurOnSubmit={true} autoCorrect={false} autoCapitalize={"none"} secureTextEntry
                  onChangeText={(text) => this.setState({password: text})}
                  />
              </Item>

              <Button
                rounded
                block
                onPress={() => this.signup()}
                style={styles.signupBtn}
              >
                <Text style={{ color: "#FFF" }}>Continue</Text>
              </Button>
            </View>
          </Content>
          <View style= {{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}
              style={{ alignSelf: "center" }}>
              <Text style={styles.helpBtns}>Back To Login</Text>
            </Button>
          </View>
        </Image>
      </Container>
    );
  }
}

export default SignUpPags;