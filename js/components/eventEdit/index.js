import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Subtitle,
  Item,
  Input,
  View,
  Toast,
  ListItem,
  CheckBox
} from "native-base";

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import styles from "./styles";
import RNGooglePlaces from 'react-native-google-places';

class EventEdit extends Component {
  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      public: false,
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      eventID : "-L-KmPi-igK08J5erd6h"
    };
  }
  
  editEvent() {
    firebaseApp.database().ref('events/' + this.state.eventID).set({
      Title: this.state.title,
      Date: this.state.date,
      StartTime: this.state.endTime,
      EndTime: this.state.startTime,
      Location : this.state.location,
      Description: this.state.description,
      Public: this.state.public
    });
    Toast.show({
      text: "Create Event Successfully",
      duration: 2500,
      position: "top",
      textStyle: { textAlign: "center" },
      type: "success"
    });
    this.props.navigation.goBack();
  }
  
  deleteEvent(id) {
    firebaseApp.database().ref('events/' + id).remove();
    var ref = firebaseApp.database().ref('users_events/' + firebaseApp.auth().currentUser.uid)
    ref.orderByChild('eventId').equalTo(id).on('child_added', (snapshot) => {
      snapshot.ref.remove()
    });
    Toast.show({
      text: "Create Event Successfully",
      duration: 2500,
      position: "top",
      textStyle: { textAlign: "center" },
      type: "success"
    });
    this.props.navigation.navigate('CalendarWFooter');
  }
  
  openSearchModal() {

    RNGooglePlaces.openPlacePickerModal(
  )
    .then((place) => {
    this.setState({whereiam: place,
                  destinationPosition: {
                    latitude: place.latitude,
                    longitude: place.longitude
                  }
                  });
    this.updateScale();
    console.log(place);
    
    //connect to the database
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }
  
  _showDatePicker = () => this.setState({ isDatePickerVisible: true });
  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
  
  _showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true });
  _hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });
  
  _showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true });
  _hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false });

  _handleDatePicked = (d) => {
    var toStr = moment(d).format('YYYY-MM-DD')
    this.setState({ date: toStr })
    this._hideDatePicker();
  };
  
  _handleStartTimePicked = (t) => {
    var toStr = moment(t).format('hh:mm a')
    this.setState({ startTime: toStr })
    this._hideStartTimePicker();
  };
  
  _handleEndTimePicked = (t) => {
    var toStr = moment(t).format('hh:mm a')
    this.setState({ endTime: toStr })
    this._hideEndTimePicker();
  };
  
  togglePublic() {
    this.setState({
      public: !this.state.public,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header hasTabs
          style={{ backgroundColor: "#2874F0" }}
          androidStatusBarColor="#dc2015"
          iosBarStyle="light-content"
          >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon  style={{ color: "#fff" }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#fff" }}>Create Event</Title>
          </Body>
          <Right />
        </Header>

        <View showsVerticalScrollIndicator={false} style={styles.bg} >
          <Item transparent>
            <Icon style={{ color: "#fff", marginLeft: 10}} name="paper" />
            <Input style={{color: "white"}} placeholder="Enter Title Here" 
              placeholderTextColor="rgba(255,255,255,0.6)" blurOnSubmit={true}
              onChangeText={(text) => this.setState({title: text})}
            />
          </Item>
        </View>
        
        <Content padder>
          <Item style={{marginBottom: 15}} rounded>
            <Icon style={{marginLeft: 10}} name="paper" />
            <Input style={{marginBottom: 15, marginTop: 8}}
              placeholder="Description" 
              multiline={true} onChangeText={(text) => this.setState({description: text})}
            />
          </Item>
          <Item style={{marginBottom: 15}} rounded>
            <Icon style={{marginLeft: 10}} name="paper" />
            <Input placeholder="Location" blurOnSubmit={true} 
              onChangeText={(text) => this.setState({location: text})}
            />
          </Item>
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button bordered rounded
              style={styles.dateBtn}
              onPress={this._showDatePicker}>
              {this.state.date == "" ? 
                <Text>Date</Text>
                : 
                <Text style={styles.timeText}>{this.state.date}</Text>
              }
            </Button>
          </View>
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button bordered rounded
              style={styles.startTimeBtn}
              onPress={this._showStartTimePicker}>
              {this.state.startTime == "" ? 
                <Text>Start Time</Text>
                : 
                <Text style={styles.timeText}>{this.state.startTime}</Text>
              }
            </Button>
            <Button bordered rounded
              style={styles.endTimeBtn}
              onPress={this._showEndTimePicker}>
              {this.state.endTime == "" ? 
                <Text>End Time</Text>
                : 
                <Text style={styles.timeText}>{this.state.endTime}</Text>
              }
            </Button>
          </View>
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button rounded success style={styles.eventTypeBtn} button onPress={() => this.togglePublic()}>
              <CheckBox color="green" checked={this.state.public} onPress={() => this.togglePublic()} />
              <Body>
                <Text style={{color: '#FFF'}}>Post in Public</Text>
              </Body>
            </Button>
          </View>
          
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button rounded style={styles.submitBtn}
              onPress={() => this.deleteEvent(this.props.navigation.state.params.id)}>
              <Text>Submit</Text>
            </Button>
          </View>
        </Content>
        
        <DateTimePicker
          mode = {'date'}
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
          titleIOS={'Choose a date'}
        />
        <DateTimePicker
          mode = {'time'}
          isVisible={this.state.isStartTimePickerVisible}
          onConfirm={this._handleStartTimePicked}
          onCancel={this._hideStartTimePicker}
          titleIOS={'Choose a start time'}
        />
        <DateTimePicker
          mode = {'time'}
          isVisible={this.state.isEndTimePickerVisible}
          onConfirm={this._handleEndTimePicked}
          onCancel={this._hideEndTimePicker}
          titleIOS={'Choose a end time'}
        />
      </Container>
      
      
    );
  }
}

export default EventEdit;