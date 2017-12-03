const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const primary = require("../../themes/variables").brandPrimary;
const commonColor = require("../../themes/variables");

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    top: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  
  
  forgotPasswordContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:
      deviceWidth < 330
        ? Platform.OS === "android"
          ? deviceHeight / 9 - 20
          : deviceHeight / 8 - 10
        : Platform.OS === "android"
          ? deviceHeight / 7 - 20
          : deviceHeight / 6 - 30
  },
  forgotPasswordHeader: {
    alignSelf: "center",
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
    color: "#FFF",
    marginTop:
      Platform.OS === "android" ? deviceHeight / 6 : deviceHeight / 6 + 10
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: primary
  },
  formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
  inputGrp: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    borderWidth: 0,
    borderColor: "transparent"
  },
  input: {
    paddingLeft: 10,
    color: "#FFF"
  },
  emailBtn: {
    height: 50,
    marginTop: 10,
  },
  helpBtns: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  signupBtn: {
    height: 50,
    marginTop: 10,
  },
  signupContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:
      deviceWidth < 330
        ? Platform.OS === "android"
          ? deviceHeight / 9 - 20
          : deviceHeight / 10 - 20
        : Platform.OS === "android"
          ? deviceHeight / 9 - 20
          : deviceHeight / 8 - 20
  },
  signupHeader: {
    alignSelf: "center",
    fontSize: 22,
    padding: 10,
    fontWeight: "bold",
    color: "#FFF",
    marginTop:
      Platform.OS === "android" ? deviceHeight / 6 : deviceHeight / 6 + 10
  }
};
