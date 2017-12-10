import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import {Button, Icon, Text} from 'native-base';

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
        <Button onPress={this.handleLinkMap.bind(this)} style={{margin: 10}}>
          <Icon active name="navigate" />
          <Text style={{color: '#FFF'}} >Get Direction</Text>
        </Button>
    );
  }
}