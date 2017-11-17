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
  Body,
  Right
} from "native-base";

import styles from "./styles";

const img7 = require("../../../img/contacts/7.jpg");
const img8 = require("../../../img/contacts/8.jpg");
const img9 = require("../../../img/contacts/9.jpg");
const img10 = require("../../../img/contacts/10.jpg");
const img11 = require("../../../img/contacts/11.jpg");
const img12 = require("../../../img/contacts/12.jpg");

const datas = [
  {
    img: img7,
    text: "7",
    note: "Its time to build a difference . ."
  },
  {
    img: img8,
    text: "8",
    note: "One needs courage to be happy and smiling all time . . "
  },
  {
    img: img9,
    text: "9",
    note: "Live a life style that matchs your vision"
  },
  {
    img: img10,
    text: "10",
    note: "Failure is temporary, giving up makes it permanent"
  },
  {
    img: img11,
    text: "11",
    note: "The biggest risk is a missed opportunity !!"
  },
  {
    img: img12,
    text: "12",
    note: "Time changes everything . ."
  }
];

class NHListThumbnail extends Component {
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
            <Title>List Thumbnail</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square size={55} source={data.img} />
                </Left>
                <Body>
                  <Text>{data.text}</Text>
                  <Text numberOfLines={1} note>{data.note}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHListThumbnail;
