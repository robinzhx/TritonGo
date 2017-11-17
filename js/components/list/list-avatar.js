import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body
} from "native-base";

import styles from "./styles";

const img1 = require("../../../img/contacts/1.jpg");
const img2 = require("../../../img/contacts/2.jpg");
const img3 = require("../../../img/contacts/3.jpg");
const img4 = require("../../../img/contacts/4.jpg");
const img5 = require("../../../img/contacts/5.jpg");
const img6 = require("../../../img/contacts/6.jpg");

const datas = [
  {
    img: img1,
    text: "1",
    note: "Its time to build a difference . .",
    time: "3:43 pm"
  },
  {
    img: img2,
    text: "2",
    note: "One needs courage to be happy and smiling all time . . ",
    time: "1:12 pm"
  },
  {
    img: img3,
    text: "3",
    note: "Live a life style that matchs your vision",
    time: "10:03 am"
  },
  {
    img: img4,
    text: "4",
    note: "Failure is temporary, giving up makes it permanent",
    time: "5:47 am"
  },
  {
    img: img5,
    text: "5",
    note: "The biggest risk is a missed opportunity !!",
    time: "11:11 pm"
  },
  {
    img: img6,
    text: "6",
    note: "Wish I had a Time machine . .",
    time: "8:54 pm"
  }
];

class NHListAvatar extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>List Avatar</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem avatar>
                <Left>
                  <Thumbnail small source={data.img} />
                </Left>
                <Body>
                  <Text>{data.text}</Text>
                  <Text numberOfLines={1} note>{data.note}</Text>
                </Body>
                <Right>
                  <Text note>{data.time}</Text>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHListAvatar;
