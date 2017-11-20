import React, { Component } from "react";

import { Image, Dimensions } from "react-native";

import {
  Container,
  Card,
  CardItem,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge,
  Tabs,
  Tab,
  TabHeading,
  Thumbnail,
  View,
  StyleProvider
} from "native-base";

import styles from "./styles";

import TabCalendar from './tabCalendar';

import getTheme from '../../../theme/components';

const event1logo = require("../../../img/event/event1_logo.jpg");
const event1 = require("../../../img/event/event1.png");
const event2logo = require("../../../img/event/event2_logo.png");
const event2 = require("../../../img/event/event2.jpg");
const event3logo = require("../../../img/event/event3_logo.png");
const event3 = require("../../../img/event/event3.jpg");

const deviceWidth = Dimensions.get("window").width;

class CalendarWFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: true,
      tab3: false,
    };
  }

  toggleTab(i) {
    this.setState({
      tab1: (i===0 ? true: false),
      tab2: (i===1 ? true: false),
      tab3: (i===2 ? true: false)
    });
  }
  
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false
    });
    this.tabView.goToPage(0)
  }

  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false
    });
    this.tabView.goToPage(1)
  }

  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true
    });
    this.tabView.goToPage(2)
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
      <Container style={styles.container}>
        <Header
          style={{ backgroundColor: "#2874F0" }}
          androidStatusBarColor="#dc2015"
          iosBarStyle="light-content"
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Main</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{ color: "#FFF" }} name="add" />
            </Button>
          </Right>
        </Header>

        <Tabs onChangeTab={({ i })=> this.toggleTab(i)} initialPage={1} ref={(tabView) => {this.tabView = tabView}} tabBarUnderlineStyle={{backgroundColor:"#FFF"}}>
            <Tab heading={ <TabHeading />}>
              <Content padder>
                
                <Card style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={event1logo} />
                      <Body>
                        <Text>Fools' Day Celebration</Text>
                        <Text note>April 1, 2017</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image
                        style={{
                          alignSelf: "center",
                          height: 150,
                          resizeMode: "cover",
                          width: deviceWidth / 1.18,
                          marginVertical: 5
                        }}
                        source={event1}
                      />
                      <Text>
                        April Fools' Day (sometimes called All Fools' Day) is celebrated 
                        every year on April 1 by playing practical jokes and spreading 
                        oaxes. The jokes and their victims are called April fools. People 
                        playing April Fool jokes expose their prank by shouting April Fool.
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                      <Button transparent>
                        <Icon name="logo-facebook" />
                        <Text> See Detail</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent>
                        <Text>Add to Calendar </Text>
                        <Icon active name="play" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                
                <Card style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={event2logo} />
                      <Body>
                        <Text>VR Club GBM #2</Text>
                        <Text note>Nov 21, 2017</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image
                        style={{
                          alignSelf: "center",
                          height: 150,
                          resizeMode: "cover",
                          width: deviceWidth / 1.18,
                          marginVertical: 5
                        }}
                        source={event2}
                      />
                      <Text>
                        The Virtual Reality Club at UCSD is a student organization at UC San 
                        Diego that connects members with the VR industry through workshops, 
                        projects, and networks. Our mission is to foster a multidisciplinary 
                        community dedicated to exploring and creating Virtual and Augmented 
                        Reality experiences.
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                      <Button transparent>
                        <Icon name="logo-facebook" />
                        <Text> See Detail</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent>
                        <Text>Add to Calendar </Text>
                        <Icon active name="play" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                
                <Card style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={event3logo} />
                      <Body>
                        <Text>TritonGo Demo Day!</Text>
                        <Text note>Dec 23, 2017</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image
                        style={{
                          alignSelf: "center",
                          height: 150,
                          resizeMode: "cover",
                          width: deviceWidth / 1.18,
                          marginVertical: 5
                        }}
                        source={event3}
                      />
                      <Text>
                        What is TritonGo? Bring the question and come over out demo event!
                        Be prepare for amazed by our great application!
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                      <Button transparent>
                        <Icon name="logo-facebook" />
                        <Text> See Detail</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent>
                        <Text>Add to Calendar </Text>
                        <Icon active name="play" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                
              </Content>
            </Tab>
            <Tab heading={ <TabHeading />}>
              <TabCalendar />
            </Tab>
            <Tab heading={ <TabHeading />}>
                <View padder><Text>Hello Robin!</Text></View>
            </Tab>
        </Tabs>

        
        <Footer>
          <FooterTab>
            <Button 
              active={this.state.tab1} 
              onPress={() => this.tabView.goToPage(0)}
              vertical
              badge
            >
              <Badge style={{ backgroundColor: "green" }}>
                <Text>3</Text>
              </Badge>
              <Icon active={this.state.tab1} name="happy" />
              <Text>Daily</Text>
            </Button>
            <Button
              active={this.state.tab2}
              onPress={() => this.tabView.goToPage(1)}
              vertical
              badge
            >
              <Badge><Text>2</Text></Badge>
              <Icon active={this.state.tab2} name="clipboard" />
              <Text>Schedule</Text>
            </Button>
            <Button
              active={this.state.tab3}
              onPress={() => this.tabView.goToPage(2)}
            >
              <Icon active={this.state.tab3} name="compass" />
              <Text>Compass</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      </StyleProvider>
    );
  }

}

export default CalendarWFooter;