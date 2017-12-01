import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View
} from 'react-native';

import {Toast} from 'native-base'

import spinner from '../../../img/loading.gif';

import { StackNavigator } from "react-navigation";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const firebaseApp = require('../../firebase').firebaseApp;

class LoginBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
            successLogin: false
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}
  
    login(){
      firebaseApp.auth().signInWithEmailAndPassword(this.props.email, this.props.password
      ).then((userData) =>
        {
          Toast.show({text: "Login Successfully!", type: 'success',buttonText: "Nice", duration: 1500})
          this.state.successLogin = true
        }
      ).catch((error) =>
        {
          Toast.show({text: "Login Failed. Please Try again. " + error, buttonText: "Okay", duration: 3000})
          this.state.successLogin = false
        }
      );
    }

	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
        
        this.login();
      
        setTimeout(() => {
            if ( this.state.successLogin ) {
                this._onGrow();
            }
        }, 2000);
      
        setTimeout(() => {
            this.setState({ isLoading: false });
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
            if (this.state.successLogin) {
                this.props.action();
            }
        }, 2700);
      
        
        
	}

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
      const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={this.props.activeOpacity > 0 ? this.props.activeOpacity : 0.8} >
							{this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>LOGIN</Text>
							}
					</TouchableOpacity>
					{this.state.isLoading ? 
                        <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} /> 
                        : 
                        undefined
                    }
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2874F0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#2874F0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#2874F0',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});
export default LoginBtn;