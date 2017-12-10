var Color = require("color");
import React, { Component } from "react";
import { Image, Switch, TouchableOpacity, Platform } from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Title,
  Button,
  Icon,
  Thumbnail,
  Item,
  Input,
  View,
  Left,
  Right,
  Body,
  Toast
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./styles";

const primary = "#2874F0";
const light = Color(primary).alpha(0.3);

class Profile extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      monSwitch: true,
      tueSwitch: false,
      wedSwitch: false,
      thuSwitch: false,
      friSwitch: false,
      satSwitch: false,
      sunSwitch: false,
      Username: "",
      email: firebaseApp.auth().currentUser.email,
      password: "",
      offset: {
        x: 0,
        y: 0
      }
    };
  }
  
  componentDidMount() {
      setTimeout(() => {
        Toast.show({
          text: "Be aware! This page is under construction. Nothing should work except email display. " +
                "Please go to other page and follow the test cases",
          duration: 10000,
          position: "top",
          textStyle: { textAlign: "center" },
          type: "warning",
          buttonText: "Okay"
        });
      }, 300);
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header hasTabs
          style={{ backgroundColor: "#2874F0" }}
          androidStatusBarColor="#dc2015"
          iosBarStyle="light-content"
        >
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate("DrawerOpen")}
            >
              <Icon active style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content showsVerticalScrollIndicator={false} style={{backgroundColor:primary}}>
          <View>
            <View style={styles.profileButtons}>
              <Button transparent style={styles.roundedButton}>
                <Icon
                  name="moon"
                  style={
                    Platform.OS === "android"
                      ? { color: "#FFF", width: 19 }
                      : { color: "#FFF", width: 18 }
                  }
                />
              </Button>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Thumbnail
                  source={require("../../../img/contacts/6.jpg")}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
              <Button transparent style={styles.roundedButton}>
                <Icon
                  name="cloud-download"
                  style={
                    Platform.OS === "android"
                      ? { color: "#FFF", width: 23 }
                      : { lineHeight: 0, color: "#FFF", width: 22 }
                  }
                />
              </Button>
            </View>
          </View>

          <View style={styles.bg}>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon style={{ color: "#FFF" }} name="person" />
                <Input disabled
                  placeholder="Alpha Tester"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon style={{ color: "#FFF" }} name="mail" />
                <Input disabled
                  placeholder={this.state.email}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon style={{ color: "#FFF" }} name="lock" />
                <Input disabled
                  placeholder="*********"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  secureTextEntry
                  style={styles.input}
                />
              </Item>
            </View>
          </View>
          <View style={styles.notificationSwitchContainer}>
            <Text style={styles.notificationHeader}>Preference Setting</Text>
            <View>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Calendar Alarm
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ monSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.monSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Daily Notification
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ tueSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.tueSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Email Push Service
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ wedSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.wedSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Auto Update
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ thuSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.thuSwitch}
                  />
                </Col>
              </Grid>
              <Grid style={styles.child}>
                <Col>
                  <Text
                    style={
                      Platform.OS === "android"
                        ? styles.aswitchText
                        : styles.switchText
                    }
                  >
                    Debug Mode
                  </Text>
                </Col>
                <Col
                  style={
                    Platform.OS === "android"
                      ? styles.aswitchContainer
                      : styles.switchContainer
                  }
                >
                  <Switch
                    onValueChange={value => this.setState({ friSwitch: value })}
                    onTintColor={light}
                    style={styles.switch}
                    thumbTintColor={primary}
                    tintColor={primary}
                    value={this.state.friSwitch}
                  />
                </Col>
              </Grid>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Profile;