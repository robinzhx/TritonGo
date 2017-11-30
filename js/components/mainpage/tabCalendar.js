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
      items: {}
    };
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
  
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const eventName = ["CSE 12, Gary Gillespie, Pepper Canyon Hall", "CSE 110, Gary Gillespie, Warren Lecture Hall", "CSE 15L, Gary Gillespie, Center Hall", "Quiz Time :( ", "VIS 142, VAF 228", "Party Time!!!"];
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 6);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: eventName[Math.floor(Math.random() * 5)],
              height: Math.max(50, Math.floor(Math.random() * 100))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No event at this date!</Text></View>
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