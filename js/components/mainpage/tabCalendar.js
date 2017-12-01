import React, { Component } from 'react';
import {
  Text,
  View
} from 'native-base';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import styles from './styles';

class TabCalendar extends Component {
  // eslint-disable-line
  
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      content:'',
      arr: []
    };
    this.allEvents();
  }

  render() {
      // eslint-disable-line
      return (
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            //markingType={'interactive'}
            //markedDates={{
            //  '2017-05-08': [{textColor: '#666'}],
            //  '2017-05-09': [{textColor: '#666'}],
            //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
            //  '2017-05-21': [{startingDay: true, color: 'blue'}],
            //  '2017-05-22': [{endingDay: true, color: 'gray'}],
            //  '2017-05-24': [{startingDay: true, color: 'gray'}],
            //  '2017-05-25': [{color: 'gray'}],
            //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />
      );
  }
  
  allEvents(){
    firebaseApp.database().ref().child('users_events').child(firebaseApp.auth().currentUser.uid).once('value', (snap) => {
      var items = []
      snap.forEach((child) => {
        items.push(child.val().eventId);
      });
      var s = this.state.content
      this.setState({numEvent: items.length})
      for (var j = 0; j < items.length; j++) {
        var ref = firebaseApp.database().ref('events/' + items[j]);
        ref.once('value').then((snapshot) => {
          var array = this.state.arr
          array.push(snapshot.val())
          this.setState({arr: array})
        });
      }
      var array = this.state.arr
      array.sort(function(a,b) {
      if (a['Time'] < b['Time'])
        return -1
      else if (a['Time'] > b['Time'])
        return 1
      return 0
      });
      for (var i = 0; i < array.length; i++) {
        for (var j in array[i]) {
          s += j + " : " + array[i][j] + "\n"
        }
      }
      this.setState({content:s, arr:array})
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
          /*const numItems = Math.floor(Math.random() * 6);
          for (let j = 0; j < numItems; j++) {
          }*/
        }
      }
      for (var j = 0; j < this.state.arr.length; j++) {
        const eventTime = this.state.arr[j]['Time'];
        this.state.items[eventTime] = [];
        this.state.items[eventTime].push({
          name: this.state.arr[j]['Description'],
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
      <View style={styles.item}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate} />
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
export default TabCalendar;