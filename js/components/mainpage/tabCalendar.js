import React, { Component } from 'react';
import {
  Text,
  View,
  Left,
  Right,
  Button,
  Icon,
  Spinner
} from 'native-base';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import styles from './styles';

class TabCalendar extends Component {
  // eslint-disable-line
  
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      arr: [],
      isLoading: true
    };
  }
  
  componentDidMount() {
      this.loadPrivate()
      
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 900);
  }

  render() {
      // eslint-disable-line
      return (
        this.state.isLoading ?
        <Spinner color="grey" style={{ margin: 20 }}/>
        :
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      );
  }
  
  loadPrivate(){
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
        });
      }
      this.setState({arr: array})
    });
  }
  
  display() {
    var array = this.state.arr
    array.sort(function(a,b) {
    if (a['Date'] < b['Date'])
      return -1
    else if (a['Date'] > b['Date'])
      return 1
    return 0
    });
    this.setState({arr:array})
  }
  
  loadItems(day) {
    if (!day) return;
    setTimeout(() => {
      // init the list of events
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //const eventName = ["CSE 12, Gary Gillespie, Pepper Canyon Hall", "CSE 110, Gary Gillespie, Warren Lecture Hall", "CSE 15L, Gary Gillespie, Center Hall", "Quiz Time :( ", "VIS 142, VAF 228", "Party Time!!!"];
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          /*const numItems = Math.floor(Math.random() * 6);
          for (let j = 0; j < numItems; j++) {
          }*/
        }
      }
      for (var j = 0; j < this.state.arr.length; j++) {
        const eventTime = this.state.arr[j]['Date'];
        this.state.items[eventTime] = [];
        this.state.items[eventTime].push({
          startTime: this.state.arr[j]['StartTime'],
          endTime: this.state.arr[j]['EndTime'],
          title: this.state.arr[j]['Title'],
          location: this.state.arr[j]['Location'],
          eventId: this.state.arr[j]['EventId'],
          height: Math.max(50, Math.floor(Math.random() * 100))
        });
      }
      
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1500);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Left style={{flex:2}}>
          <Text>{item.startTime} - {item.endTime}</Text>
          <Text>{item.title}</Text>
          <Text>{item.location}</Text>
        </Left>
        <Right>
          <Button onPress={() => this.props.editevent(item.eventId)} >
            <Icon active name="play"/>
          </Button>
        </Right>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate} />
    );
  }

  rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
export default TabCalendar;