import React, { Component } from 'react'

import { Image, Dimensions } from "react-native";

import {
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Thumbnail,
  Body,
  Button,
  Icon
} from 'native-base';

import styles from "./styles";

const event1logo = require("../../../img/event/event1_logo.jpg");
const event1 = require("../../../img/event/event1.png");
const event2logo = require("../../../img/event/event2_logo.png");
const event2 = require("../../../img/event/event2.jpg");
const event3logo = require("../../../img/event/event3_logo.png");
const event3 = require("../../../img/event/event3.jpg");

const deviceWidth = Dimensions.get("window").width;

class TabDaily extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
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
    )
  }
}

export default TabDaily