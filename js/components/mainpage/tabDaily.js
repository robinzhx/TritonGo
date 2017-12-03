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
  ListItem
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

//   allEvents(){
//     firebaseApp.database().ref().child('users_events').child(firebaseApp.auth().currentUser.uid).once('value', (snap) => {
//       var items = []
//       snap.forEach((child) => {
//         items.push(child.val().eventId);
//       });
//       var s = this.state.content
//       s = s + "There are " + items.length + " events!\n"
//       this.setState({content : s})
//       for (var j = 0; j < items.length; j++) {
//         var ref = firebaseApp.database().ref('events/' + items[j]);
//         ref.once('value').then((snapshot) => {
//           var array = this.state.arr
//           array.push(snapshot.val())
//           this.setState({arr: array})
//         });
//       }
//     });
//   }
  
  loadPublic(){
    firebaseApp.database().ref().child('events').on('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        if (child.val()['Public'])
          items.push(child.val());
      });
      this.setState({arr: items})
    });
  }
  
  display() {
    var s = this.state.content
    var array = this.state.arr
    array.sort(function(a,b) {
      if (a['Date'] < b['Date'])
        return 1
      else if (a['Date'] > b['Date'])
        return -1
      return 0
    });
    for (var i = 0; i < array.length; i++) {
      for (var j in array[i]) {
        s += j + " : " + array[i][j] + "\n"
      }
    }
    this.setState({content:s, arr: array})
  }
  
  componentDidMount() {
      this.loadPublic()
      
      setTimeout(() => {
        this.display();
        this.setState({ isLoading: false });
      }, 900);
  }
  
  render() {
      /*
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
              */
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
                      <Button transparent
                        onPress={()=> this.display()}>
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