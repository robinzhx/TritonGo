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
import TabDaily from './tabDaily';
import TabMap from './mapView';

import getTheme from '../../../theme/components';


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
              <Icon active style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Main</Title>
          </Body>
          <Right>
            <Button transparent><Icon style={{ color: "#FFF" }} name="search" /></Button>
            <Button transparent><Icon style={{ color: "#FFF" }} name="more" /></Button>
          </Right>
        </Header>

        <Tabs onChangeTab={({ i })=> this.toggleTab(i)} initialPage={1} ref={(tabView) => {this.tabView = tabView}} tabBarUnderlineStyle={{backgroundColor:"#FFF"}}>
            <Tab heading={ <TabHeading />}>
              <TabDaily />
            </Tab>
            <Tab heading={ <TabHeading />}>
              <TabCalendar />
            </Tab>
            <Tab heading={ <TabHeading />}>
                <TabMap />
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