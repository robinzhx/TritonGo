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
  CheckBox
} from "native-base";

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import styles from "./styles";

class EventCreate extends Component {
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
      location:"",
      description: "",
      type: ""
    };
  }
  
  createEvent() {
    var eventID = firebaseApp.database().ref('events/').push({
      Title: "",
      Date: "",
      StartTime: "",
      EndTime: "",
      Location : "",
      Description: "",
      Public: false,
      EventId: ""
    });
    firebaseApp.database().ref('events/' + eventID.key).set({
      Title: this.state.title,
      Date: this.state.date,
      StartTime: this.state.endTime,
      EndTime: this.state.startTime,
      Location : this.state.location,
      Description: this.state.description,
      Public: this.state.public,
      EventId: eventID.key
    });
    firebaseApp.database().ref('users_events/' + firebaseApp.auth().currentUser.uid).push({
      eventId: eventID.key
    });
    
    Toast.show({
      text: "Create Event Successfully",
      duration: 2500,
      position: "top",
      textStyle: { textAlign: "center" },
      type: "success",
      buttonText: "Nice"
    });
    this.props.navigation.goBack();
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
            <Icon active style={{ color: "#fff" }} name="bulb" />
          </Body>
          <Right />
        </Header>

        <View showsVerticalScrollIndicator={false} style={styles.bg} >
          <Item transparent style={{marginTop:-10}}>
            <Input style={{color: "#fff", marginLeft: 4, textAlign: 'center', fontWeight: 'bold' }} 
              placeholder="Enter Your Title" 
              placeholderTextColor="rgba(255,255,255,0.8)" 
              selectionColor={"#fff"}
              onChangeText={(text) => this.setState({title: text})}
              blurOnSubmit={true}
              autoFocus = {true}
            />
          </Item>
        </View>
        
        
        <Content padder>
          
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Item regular style={{marginBottom: 10, alignItems:'flex-start'}} >
            <Icon style={{marginLeft: 5, marginTop: 10}} name="paper" />
            <Input style={{marginBottom: 15, marginTop: 7}}
              placeholder="Description" blurOnSubmit={true} 
              multiline={true} onChangeText={(text) => this.setState({description: text})}
            />
          </Item>
          <Item regular style={{marginBottom: 10}} >
            <Icon style={{marginLeft: 5}} name="map" />
            <Input placeholder="Location" blurOnSubmit={true} 
              onChangeText={(text) => this.setState({location: text})}
            />
          </Item>
          </KeyboardAvoidingView>
          
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
              onPress={() => this.createEvent()}>
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

export default EventCreate;