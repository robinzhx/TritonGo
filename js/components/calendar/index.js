import React, { Component } from "react";

import {
  Container,
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
  View,
  StyleProvider
} from "native-base";

import styles from "./styles";

import TabCalendar from './tabCalendar';

import getTheme from '../../../native-base-theme/components';

class CalendarWFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: true,
      tab3: false
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Main</Title>
          </Body>
          <Right />
        </Header>

        <Tabs onChangeTab={({ i })=> this.toggleTab(i)} initialPage={1} ref={(tabView) => {this.tabView = tabView}} tabBarUnderlineStyle={{opacity:1}}>
            <Tab heading={ <TabHeading />}>
                <View padder><Text>Hello UCSD!</Text></View>
            </Tab>
            <Tab heading={ <TabHeading />}>
                <View padder><Text>Hello Kugou!</Text></View>
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
                <Text>7</Text>
              </Badge>
              <Icon active={this.state.tab2} name="happy" />
              <Text>Daily</Text>
            </Button>
            <Button
              active={this.state.tab2}
              onPress={() => this.tabView.goToPage(1)}
              vertical
              badge
            >
              <Badge><Text>2</Text></Badge>
              <Icon active={this.state.tab1} name="clipboard" />
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