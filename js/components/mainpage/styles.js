const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  item: {
    flexDirection: "row", justifyContent: "space-between",
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
    marginTop: 50,
    marginRight: 10,
    borderTopColor: 'grey',
    borderTopWidth: 1,
    opacity: 0.1
  },
  leftItem: {
    flex:2,
    marginLeft:5
  },
  itemTime: {
    fontSize:14,
    marginBottom:8
  },
  itemTitle: {
    fontSize:18,
  },
  itemLocation: {
    marginTop:6,
    fontSize:13,
    color:"#808080"
  }
};
