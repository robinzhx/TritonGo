/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import CalendarWFooter from "./components/mainpage/"; 
import Profile from "./components/Profile/";

import Home from "./components/home/";

import SplashPage from "./components/splashscreen/";
import SideBar from "./components/sidebar";

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home, 
          navigationOptions: ({navigation}) => ({
          drawerLockMode: 'locked-closed'})
    },
    CalendarWFooter: { screen: CalendarWFooter},
    Profile: { screen: Profile},
    
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
