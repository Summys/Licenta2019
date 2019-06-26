import React, { Component } from "react";
import { View } from "react-native";
import SCREENS from "../../enums/screensEnum";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import AsyncStorage from "@react-native-community/async-storage";
class Splash extends Component {
  state = {};
  componentDidMount() {
    const {
      navigation: { navigate },
      myUserId
    } = this.props;

    AsyncStorage.getItem("Meteor.loginToken").then(loginToken => {
      if (loginToken) {
        navigate(SCREENS.RETROSPECT);
      } else {
        navigate(SCREENS.LOGIN);
      }
    });
  }
  render() {
    return <View />;
  }
}

const mapStateToProps = state => ({
  myUserId: state.chat.myUserId
});

export default connect(mapStateToProps)(withApollo(Splash));
