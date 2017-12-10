import React, { Component } from "react";
import { Image } from "react-native";

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
    Toast
} from "native-base";

import styles from "./style";

const drawerCover = require("../../../img/drawer-cover.png");

const drawerImage = require("../../../img/logo-tritongo.png");

const datas = [
	{
		name: "Calendar",
		route: "CalendarWFooter",
		icon: "clipboard",
		bg: "#C5F442",
	},
    {
		name: "My Profile",
		route: "Profile",
		icon: "person",
		bg: "#EF6092",
	},
    {
		name: "Log Out",
		route: "Home",
		icon: "refresh",
		bg: "#C5F442",
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

    signOut() {
      firebaseApp.auth().signOut().then(function() {
        // Sign-out successful.
        Toast.show({
          text: "Sign out successfully",
          duration: 2500,
          position: "top",
          textStyle: { textAlign: "center" },
          type: "success",
          buttonText: "Nice"
        });
      }, function(error) {
        // An error happened.
        Toast.show({
          text: "Sign out may not succeed. You can ignore or try login/sign out again",
          duration: 3000,
          position: "top",
          textStyle: { textAlign: "center" },
          type: "warning",
          buttonText: "Okay"
        });
      });
      this.props.navigation.navigate("Home");
    }
  
	render() {
		return (
          <Container>
            <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
              <Image source={drawerCover} style={styles.drawerCover}>
                <Image square style={styles.drawerImage} source={drawerImage} />
              </Image>
              <List
                dataArray={datas}
                renderRow={data =>
                  <ListItem button noBorder onPress={() => 
                    (data.name === "Log Out") ? 
                      this.signOut()
                      :
                      this.props.navigation.navigate(data.route)
                  }>
                    <Left>
                      <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
                      <Text style={styles.text}>
                        {data.name}
                      </Text>
                    </Left>
                    {data.types &&
                      <Right style={{ flex: 1 }}>
                        <Badge
                          style={{
                            borderRadius: 3,
                            height: 25,
                            width: 72,
                            backgroundColor: data.bg,
                          }}
                        >
                          <Text style={styles.badgeText}>{`${data.types} Types`}</Text>
                        </Badge>
                    </Right>}
                </ListItem>}
              />
            </Content>
          </Container>
		);
	}
}

export default SideBar;
