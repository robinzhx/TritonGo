import React, { Component } from "react";
import { KeyboardAvoidingView } from "react-native";
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
  CheckBox,
  ActionSheet
} from "native-base";

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import styles from "./styles";
import RNGooglePlaces from 'react-native-google-places';

var DELETECONFIRMBUTTON = ["Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

class EventEdit extends Component {
  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      
      public: false,
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      locationName: "",
      eventId:"",
      latitude: "",
      longitude: ""
    };
  }
  
  componentDidMount() {
    this.setState({
      public: this.props.navigation.state.params.eventItem['public'],
      title: this.props.navigation.state.params.eventItem['title'],
      date: this.props.navigation.state.params.eventItem['date'],
      startTime: this.props.navigation.state.params.eventItem['startTime'],
      endTime: this.props.navigation.state.params.eventItem['endTime'],
      locationName: this.props.navigation.state.params.eventItem['locationName'],
      description: this.props.navigation.state.params.eventItem['description'],
      eventId : this.props.navigation.state.params.eventItem['eventId'],
      latitude: this.props.navigation.state.params.eventItem['latitude'],
      longitude: this.props.navigation.state.params.eventItem['longitude']
    });
  }
  
  editEvent() {
    firebaseApp.database().ref('events/' + this.state.eventId).set({
      Title: this.state.title,
      Date: this.state.date,
      StartTime: this.state.startTime,
      EndTime: this.state.endTime,
      Description: this.state.description,
      Public: this.state.public,
      LocationName: this.state.locationName,
      Latitude: this.state.latitude,
      Longitude: this.state.longitude,
      EventId : this.state.eventId
    });
    Toast.show({
      text: "Edit Event Successfully",
      duration: 2500,
      position: "top",
      textStyle: { textAlign: "center" },
      type: "success"
    });
    this.props.navigation.navigate('CalendarWFooter');
  }
  
  deleteEvent(id) {
    firebaseApp.database().ref('events/' + id).remove();
    var ref = firebaseApp.database().ref('users_events/' + firebaseApp.auth().currentUser.uid)
    ref.orderByChild('eventId').equalTo(id).on('child_added', (snapshot) => {
      snapshot.ref.remove()
    });
    Toast.show({
      text: "Delete Event Successfully",
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
    this.setState({
                    latitude: place.latitude,
                    longitude: place.longitude,
                    locationName: place.name
                  });
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
              <Icon style={{ color: "#fff" }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Icon active style={{ color: "#fff" }} name="attach" />
          </Body>
          <Right />
        </Header>

        <View showsVerticalScrollIndicator={false} style={styles.bg} >
          <Item transparent style={{marginTop:-10}}>
            <Input style={{color: "#fff", marginLeft: 4, textAlign: 'center', fontWeight: 'bold' }} 
              placeholder="Enter Your Title" 
              placeholderTextColor="rgba(255,255,255,0.8)" 
              selectionColor={"#fff"}
              value={this.state.title}
              onChangeText={(text) => this.setState({title: text})}
              blurOnSubmit={true}
            />
          </Item>
        </View>
        
        
        <Content padder>
          
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Item regular style={{marginBottom: 10, alignItems:'flex-start'}} >
            <Icon style={{marginLeft: 5, marginTop: 10}} name="paper" />
            <Input style={{marginBottom: 15, marginTop: 7}}
              placeholder="Description" blurOnSubmit={true} 
              value={this.state.description}
              multiline={true} onChangeText={(text) => this.setState({description: text})}
            />
          </Item>
          </KeyboardAvoidingView>
          
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button bordered
              style={styles.dateBtn}
              onPress={() => this.openSearchModal() }>
              <Icon style={{color: '#000', marginLeft: 0, marginRight: 14}} name="map" />
              {this.state.locationName == "" ? 
                <Text style={styles.placeholderText}>Location</Text>
                : 
                <Text style={styles.timeText}>{this.state.locationName}</Text>
              }
            </Button>
          </View>
          
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            
            <Button bordered
              style={styles.dateBtn}
              onPress={this._showDatePicker}>
              <Icon style={{color: '#000', marginLeft: 0, marginRight: 14}} name="time" />
              {this.state.date == "" ? 
                <Text style={styles.placeholderText}>Date</Text>
                : 
                <Text style={styles.timeText}>{this.state.date}</Text>
              }
            </Button>
          </View>
          <View style={{ marginBottom: 10, marginTop: 5, flexDirection: "row" }}>
            <Button bordered
              style={styles.startTimeBtn}
              onPress={this._showStartTimePicker}>
              {this.state.startTime == "" ? 
                <Text style={styles.placeholderText}>Start Time</Text>
                : 
                <Text style={styles.timeText}>{this.state.startTime}</Text>
              }
            </Button>
            <Icon style={{margin:8, color:"grey"}} name="arrow-forward" />
            <Button bordered
              style={styles.endTimeBtn}
              onPress={this._showEndTimePicker}>
              {this.state.endTime == "" ? 
                <Text style={styles.placeholderText}>End Time</Text>
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
              onPress={() => this.editEvent()}>
              <Text>Submit</Text>
            </Button>
            <Button rounded style={styles.deleteBtn} danger
              onPress={() => ActionSheet.show(
                {
                  options: DELETECONFIRMBUTTON,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Are you sure to delete this event?"
                },
                buttonIndex => {
                  (buttonIndex === DESTRUCTIVE_INDEX) ? this.deleteEvent(this.state.eventId) : null
                }
              )}
            >
              <Text>Delete</Text>
              
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