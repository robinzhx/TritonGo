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
  StyleProvider,
  Toast
} from "native-base";

import styles from "./styles";

import TabCalendar from './tabCalendar';
import TabDaily from './tabDaily';
import TabMap from './tabMap';

import getTheme from '../../../theme/components';


class CalendarWFooter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: true,
      tab3: false,
      content:'',
      arr: [],
      numEvent: 0,
      numDaily: 0
    };
  }

  componentDidMount() {
      setTimeout(() => {
        this.allEvents()
      }, 300);
  }
  
  allEvents(){
    firebaseApp.database().ref().child('users_events').child(firebaseApp.auth().currentUser.uid).on('value', (snap) => {   
      var items = []
      var array = []
      snap.forEach((child) => {
        items.push(child.val().eventId);
      });
      for (var j = 0; j < items.length; j++) {
        var ref = firebaseApp.database().ref('events/' + items[j]);
        ref.once('value').then((snapshot) => {
            array.push(snapshot.val())
            this.setState({numEvent: array.length})
        });
      }
    });
  
    firebaseApp.database().ref().child('events').on('value', (snap) => {
      var itemsPub = []
      snap.forEach((child) => {
        if (child.val()['Public'])
          itemsPub.push(child.val());
      });
      this.setState({numDaily: itemsPub.length})
    });
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

  editEvent(item) {
    this.props.navigation.navigate('EventEdit',{id : item})
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
              <Icon active style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Main</Title>
          </Body>
          <Right>
            <Button 
              transparent
              onPress={() => this.props.navigation.navigate("EventCreate")}
            >
              <Icon active style={{ color: "#FFF" }} name="add" />
            </Button>
          </Right>
        </Header>
        
        <Tabs onChangeTab={({ i })=> this.toggleTab(i)} initialPage={1} ref={(tabView) => {this.tabView = tabView}}
          tabBarUnderlineStyle={{backgroundColor:"#FFF"}}>
            <Tab heading={ <TabHeading />}>
              <TabDaily />
            </Tab>
            <Tab heading={ <TabHeading />}>
              <TabCalendar editevent={(id) => this.editEvent(id)} eventNames= {this.state.arr}/>
            </Tab>
            <Tab heading={ <TabHeading />}>
              <TabMap location={{latitude: 37.621343, longitude: -122.378957}}/>
            </Tab>
        </Tabs>

        
        <Footer>
          <FooterTab>
            {(this.state.numDaily != 0) ?
              <Button 
                active={this.state.tab1} 
                onPress={() => this.tabView.goToPage(0)}
                vertical
                badge
              >
                <Badge style={{ backgroundColor: "green" }}>
                  <Text>{this.state.numDaily}</Text>
                </Badge>
                <Icon active={this.state.tab1} name="happy" />
                <Text>Daily</Text>
              </Button>
              :
              <Button 
                active={this.state.tab1} 
                onPress={() => this.tabView.goToPage(0)}
              >
                <Icon active={this.state.tab1} name="happy" />
                <Text>Daily</Text>
              </Button>
            }
            {(this.state.numEvent != 0) ? 
              <Button
                active={this.state.tab2}
                onPress={() => this.tabView.goToPage(1)}
                vertical
                badge
              >
                <Badge><Text>{this.state.numEvent}</Text></Badge>
                <Icon active={this.state.tab2} name="clipboard" />
                <Text>Schedule</Text>
              </Button>
              :
              <Button
                active={this.state.tab2}
                onPress={() => this.tabView.goToPage(1)}
              >
                <Icon active={this.state.tab2} name="clipboard" />
                <Text>Schedule</Text>
              </Button>
            }
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