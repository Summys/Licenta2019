/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { View } from "react-native";
import { ApolloProvider } from "react-apollo";
import Provider from "react-redux/es/components/Provider";
import createStore from "../redux";
import Rehydratation from "../redux/Rehydration.js";
import init from "./client";
import { ScreenNavigator2, ScreenNavigator1 } from "../features";
import AsyncStorage from "@react-native-community/async-storage";

let store = createStore();

export default class WithProvider extends Component {
  state = { client: undefined };

  componentWillMount() {
    Rehydratation.updateReducers(store);
  }

  componentDidMount() {
    this.initClient();
  }

  initClient = async () => {
    const client = await init();
    AsyncStorage.getItem("Meteor.loginToken").then(loginToken => {
      if (loginToken) {
        this.setState({ initialRouteName: "Retrospect", client });
      } else {
        this.setState({ initialRouteName: "Authentication", client });
      }
    });
  };
  render() {
    const { client, initialRouteName } = this.state;
    if (!client) {
      return <View />;
    }
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          {initialRouteName === "Retrospect" ? (
            <ScreenNavigator2 />
          ) : (
            <ScreenNavigator1 screenProps={{ reinitClient: this.initClient }} />
          )}
        </ApolloProvider>
      </Provider>
    );
  }
}
