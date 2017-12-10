import React, { Component } from 'react';
import {
  Text,
  View,
  Left,
  Right,
  Button,
  Icon,
  Spinner,
  Subtitle,
  Title
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
          selected={(this.props.showDate)}
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
      
      // sorting array
      array.sort(function(a,b) {
        if (a['Date'] < b['Date'])
          return -1
        else if (a['Date'] > b['Date'])
          return 1
        return 0
      });
      this.setState({arr: array})
    });
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
        }
      }
      for (var j = 0; j < this.state.arr.length; j++) {
        const eventTime = this.state.arr[j]['Date'];
        var duplicate = false;
        if (!this.state.items[eventTime]) {
          this.state.items[eventTime] = [];
        } 
        for (var k = 0; k < this.state.items[eventTime].length; k++) {
          if (this.state.items[eventTime][k].eventId === this.state.arr[j]['EventId']) {
            duplicate = true;
            break;
          }
        }
        if (!duplicate) {
          this.state.items[eventTime].push({
            startTime: this.state.arr[j]['StartTime'],
            endTime: this.state.arr[j]['EndTime'],
            date: this.state.arr[j]['Date'],
            title: this.state.arr[j]['Title'],
            description: this.state.arr[j]['Description'],
            locationName: this.state.arr[j]['LocationName'],
            latitude: this.state.arr[j]['Latitude'],
            longitude: this.state.arr[j]['Longitude'],
            eventId: this.state.arr[j]['EventId'],
            public: this.state.arr[j]['Public'],
            height: Math.max(50, Math.floor(Math.random() * 100))
          });
        }
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
        <Left style={styles.leftItem}>
          <Text style={styles.itemTime}>{item.startTime} - {item.endTime}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemLocation}>{item.locationName}</Text>
        </Left>
        <Right>
          <Button onPress={() => this.props.editevent(item)} >
            <Icon active name="play"/>
          </Button>
          <Button onPress={() => this.props.navigatemap({latitude: item.latitude, longitude: item.longitude})} >
            <Icon active name="navigate"/>
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
    return r1 !== r2;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
export default TabCalendar;