const React = require("react-native");

const { StyleSheet } = React;
const primary = "#2874F0";

export default {
  container: {
    backgroundColor: "#FFF"
  },
  bg: {
    backgroundColor: primary,
  },
  mb10: {
    marginBottom: 10
  },
  startTimeBtn: {
    borderColor: "grey",
    marginRight: 5, 
    flex:1
  },
  endTimeBtn: {
    borderColor: "grey",
    marginLeft: 5, 
    flex:1
  },
  dateBtn: { 
    borderColor: "grey",
    justifyContent: "flex-start",
    flex:1
  },
  eventTypeBtn: {
    flex:1,
  },
  submitBtn: { 
    flex:1, 
    justifyContent: "center" 
  },
  placeholderText: {
    color: "rgba(0,0,0,0.6)"
  },
  timeText: {
    color: "#000"
  }
};