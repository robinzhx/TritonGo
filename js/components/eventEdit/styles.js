const React = require("react-native");

const { StyleSheet } = React;
const primary = "#2874F0";

export default {
  container: {
    backgroundColor: "#FFF"
  },
  bg: {
    backgroundColor: primary
  },
  mb10: {
    marginBottom: 10
  },
  startTimeBtn: {
    borderColor: "grey",
    marginRight: 5, 
    flex:1, 
    justifyContent: "center"
  },
  endTimeBtn: {
    borderColor: "grey",
    marginLeft: 5, 
    flex:1, 
    justifyContent: "center"
  },
  dateBtn: { 
    borderColor: "grey",
    flex:1, 
    justifyContent: "center" 
  },
  eventTypeBtn: {
    flex:1,
  },
  submitBtn: { 
    flex:1, 
    justifyContent: "center" 
  },
  timeText: {
    color: "black"
  }
};