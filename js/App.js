/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import CalendarWFooter from "./components/mainpage/";
import Profile from "./components/Profile/"; 
import Home from "./components/home/";
import SignUpPage from "./components/home/signuppage";
import ForgetPage from "./components/home/forgetpage";

import Drawer from "./Drawer";

import EventCreate from "./components/eventCreate/"
import EventEdit from "./components/eventEdit/"


const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },

      
        Home: { screen: Home },
        SignUpPage: { screen: SignUpPage },
        ForgetPage: { screen: ForgetPage },
      
        CalendarWFooter: { screen: CalendarWFooter },
        EventCreate: {screen: EventCreate},
        EventEdit: {screen: EventEdit},
        
        Profile: { screen: Profile},

    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
