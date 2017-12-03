import React, { Component } from 'react';

import { StyleSheet, Dimensions } from "react-native";

import {
  Text,
  View,
  Button,
  Item,
  Icon,
  Input
} from 'native-base';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';

import LinkMap from './linkMap';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

class TabMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      destinationPosition: {
        latitude: 32.880689,
        longitude: -117.234420
      },
      resultJson: null
    }
  }

  watchID: ?number = null

  fetchData() {
    var mode = 'driving'; // 'walking';
    var origin = this.state.initialPosition.latitude + ',' + this.state.initialPosition.longitude;
    var destination = this.state.destinationPosition.latitude + ',' + this.state.destinationPosition.longitude;
    var APIKEY = 'AIzaSyBjS7YuYNHvBis6N4gCEJKLauqnkSfAbUQ';
    var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&language=en&origins=${origin}&destinations=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
              this.setState({resultJson:responseJson});
      }).catch(e => {console.warn(e)});
    console.log(url);
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      
      if (this.props.location) {
        this.setState({destinationPosition: this.props.location})
      }
      var newLatDelta = Math.abs(lat - this.state.destinationPosition.latitude) * 4;
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: newLatDelta,
        longitudeDelta: newLatDelta * ASPECT_RATIO
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})


      this.fetchData();
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  onRegionChange(region) {
    this.setState({initialPosition: region});
  }



  render() {
    let displayInfo = null;
    if(!this.state.resultJson) {
      displayInfo = 'Loading';
    } else {
      displayInfo = this.state.resultJson.rows[0].elements[0].distance.text + ' / ' +
                    this.state.resultJson.rows[0].elements[0].duration.text;
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
          onRegionChange={this.onRegionChange.bind(this)}
          zoomEnabled = {true}
          rotateEnabled= {false}
          scrollEnabled = {false}
          >
          
          <MapView.Marker
            coordinate={this.state.markerPosition} visible={this.state.visible} >
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
          </MapView.Marker>
          <MapView.Marker
            coordinate={this.state.destinationPosition}
            title={displayInfo}>

          </MapView.Marker>
        </MapView>
        <View style={{padding: 10, flexDirection: 'row'}}>
          <Button rounded style={{ backgroundColor: "rgba(0,0,0,0.4)", flex: 1, justifyContent: 'flex-start'}} 
            /*onPress={this.openSearchModal.bind(this)}*/>
            <Icon active name="search" style={{ marginLeft:-10, marginRight:10 }}/>
            <Text>Search</Text>
          </Button>
        </View>
        {/*<LinkMap start={this.state.initialPosition} end={this.state.destinationPosition}/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default TabMap