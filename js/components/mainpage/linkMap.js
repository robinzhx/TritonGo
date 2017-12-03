import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';

import MapLinking from 'react-native-use-external-maps';

export default class LinkMap extends Component {
 
  handleLinkMap(){

 
    MapLinking.planRoute(
    	{
    		lat: this.props.start.latitude, 
    		lng: this.props.start.longitude, 
    		title: 'starting point'
    	},
    	{
    		lat: this.props.end.latitude,
    		lng: this.props.end.longitude,
    		title: 'destination'
    	},
    	'drive'
    );

  }
 
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleLinkMap.bind(this)} title="Get Directions" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 20  
  }
});