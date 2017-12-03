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
  Footer
} from "native-base";
import styles from "./styles";

class ForgotPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }

  forgotPassword(){
    firebaseApp.auth().sendPasswordResetEmail(this.state.email
        ).then(() =>
    {
      Toast.show({
        text: "Please check your mailbox",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "warning"
      });
      this.props.navigation.goBack();
    }).catch((error) =>
    {
      Toast.show({
        text: error.message,
        duration: 5000,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "danger",
        buttonText: "Okay"
      });
    });
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Image
          source={require("../../../img/launchscreen-bg.png")}
          style={styles.background}
        >
          <Content contentOffset={this.state.offset}>
            <Content padder scrollEnabled={false}>
              <Text style={styles.forgotPasswordHeader}>
                Forgot Your Password?
              </Text>
              <View style={styles.forgotPasswordContainer}>
                <Item style={{marginBottom: 20}} rounded>
                  <Icon active style={{marginLeft: 10, color: "#fff"}} name="mail" />
                  <Input style={{ color: "#fff"}} placeholderTextColor = "#FFF" placeholder="Email" 
                    blurOnSubmit={true} autoCorrect={false} autoCapitalize={"none"}
                    onChangeText={(text) => this.setState({email: text})}/>
                </Item>

                <Button
                  rounded
                  block
                  onPress={() => this.forgotPassword()}
                  style={styles.emailBtn}
                >
                  <Text style={{ color: "#FFF" }}>Send Email</Text>
                </Button>
              </View>
            </Content>
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

export default ForgotPage;
