import React, { Component } from "react";
import { BackAndroid, StatusBar, Platform } from "react-native";
import { variables, Drawer } from "native-base";

import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import platform from "../native-base-theme/variables/platform";


import Home from "./components/home/";
import SignUpPage from "./components/home/signuppage";
import ForgetPage from "./components/home/forgetpage";

import CalendarWFooter from "./components/mainpage/"; 
import EventCreate from "./components/eventCreate/"
import EventEdit from "./components/eventEdit/"

import Profile from "./components/Profile/"; 

class AppNavigator extends Component {
  render() {
    return ;
  }
}

export default AppNavigator;
