import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

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

const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-tritongo.png");

class Home extends Component {
	// eslint-disable-line

	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Image source={launchscreenLogo} style={styles.logo} />
					</View>
                  
                    <Content style={{marginTop: 60}} >
                      <Form style={{marginRight: 10}}>
                        <Item floatingLabel>
                          <Icon active name="person" style={{ color: "#fff"}} />
                          <Label style={{color: '#fff', marginHorizontal: 10 }}>Username</Label>
                          <Input style={{color: '#fff', marginHorizontal: 10 }} />
                        </Item>
                        
                        <Item floatingLabel>
                          <Icon active name="lock" style={{ color: "#fff" }} />
                          <Label style={{color: '#fff', marginLeft: 10}}>Password</Label>
                          <Input style={{color: '#fff', marginLeft: 10}} secureTextEntry ref={'passwordInput'}/>
                        </Item>
                      </Form>
                      <Button transparent small
                        style={{ opacity:0.6, alignSelf: 'flex-end' }}
                      >
                        <Text style={{color: '#fff'}}>Forget?</Text>
                        <Icon active name="refresh" style={{ color: "#fff" }} />
                      </Button>
                    </Content>

					<View style={{ marginBottom: 20 }}>
						<Button rounded 
							style={{margin: 20, justifyContent: 'center', alignSelf: 'stretch'}}
                            //onPress={() => this.props.navigation.navigate("./")}
							onPress={() => this.props.navigation.navigate("CalendarWFooter")}
						>
							<Text>Sign In</Text>
						</Button>
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

export default Home;
