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
  Icon,
  Spinner,
  List,
  ListItem,
  Toast
} from 'native-base';

import styles from "./styles";

const event1logo = require("../../../img/event/event1_logo.jpg");
const event1 = require("../../../img/event/event1.png");
const event2logo = require("../../../img/event/event2_logo.png");
const event2 = require("../../../img/event/event2.jpg");
const event3logo = require("../../../img/event/event3_logo.png");
const event3 = require("../../../img/event/event3.jpg");

const deviceWidth = Dimensions.get("window").width;

const firebaseApp = require('../../firebase').firebaseApp;

class TabDaily extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      content:'',
      arr: [],
      isLoading: true
    }
  }
  
  loadPublic(){
    firebaseApp.database().ref().child('events').on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        if (child.val()['Public'])
          items.push(child.val());
      });
      items.sort(function(a,b) {
        if (a['Date'] < b['Date'])
          return 1
        else if (a['Date'] > b['Date'])
          return -1
        return 0
      });
      this.setState({arr: items})
    });
  }
  
  componentDidMount() {
      this.loadPublic()
      
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 900);
  }
  
  addToCalendar(id, date) {
    let firbaseObject = firebaseApp.database().ref().child('users_events').child(firebaseApp.auth().currentUser.uid);
    var duplicate = false;
    firbaseObject.on('value', (snap) => {
      snap.forEach((child) => {
        if (id === child.val().eventId) {
          duplicate = true
        }
      });
    });
    if (!duplicate) {
      firbaseObject.push({eventId: id})
      Toast.show({
        text: "Add Event Successfully",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "success",
        buttonText: "Nice"
      });
    } else {
      Toast.show({
        text: "You already has this event at " + date + "!",
        duration: 2500,
        position: "top",
        textStyle: { textAlign: "center" },
        type: "warning",
        buttonText: "Okay"
      });
      this.props.showdate(date);
    }
  }
  
  render() {
      
      return (
        this.state.isLoading ?
        <Spinner color="grey" style={{ margin: 20 }}/>
        :
        <List dataArray={this.state.arr} 
          renderRow={ 
            (item) => 
              <ListItem>
                <Card style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={event1logo} />
                      <Body>
                        <Text>{item['Title']}</Text>
                        <Text note>{item['Date']}</Text>
                        <Text note>{item['StartTime']} - {item['EndTime']}</Text>
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
                        {item['Description']}
                      </Text>
                      <Text style={styles.itemLocation}>
                        Location: {item['LocationName']}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                      <Button transparent 
                        onPress={() => this.props.navigatemap(
                          {latitude: item['Latitude'], longitude: item['Longitude'], gotPosition:true})}
                      >
                        <Icon active name="navigate" />
                        <Text> Check Location</Text>
                      </Button>
                    </Left>
                    <Right>
                      <Button transparent
                        onPress={()=> this.addToCalendar(item['EventId'], item['Date'])}>
                        <Text>Add to Calendar </Text>
                        <Icon active name="play" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              </ListItem>
            }
          />
      )
  }
}

export default TabDaily