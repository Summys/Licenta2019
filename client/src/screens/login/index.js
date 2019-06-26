import React, { PureComponent } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import createMessage from "../../graphql/mutations/createMessage";
import { withApollo } from "react-apollo";
import Input from "../../common/components/Input";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../../helpers/convertToDP";
import loginWithPassword from "meteor-apollo-accounts/client/loginWithPassword";
import colors from "../../common/styling/colors";
import screensEnum from "../../enums/screensEnum";
import { setTokenStore } from "meteor-apollo-accounts/client/store";
import AsyncStorage from "@react-native-community/async-storage";
import ChatActions from "../../redux/chatReducer";

class Login extends PureComponent {
  static navigationOptions({ navigation }) {
    return {
      headerMode: "none"
    };
  }
  state = {
    isLoading: false
  };

  componentDidMount() {
    setTokenStore({
      async set({ userId, token, tokenExpires }) {
        await AsyncStorage.setItem("Meteor.userId", userId);
        await AsyncStorage.setItem("Meteor.loginToken", token);
        await AsyncStorage.setItem(
          "Meteor.loginTokenExpires",
          tokenExpires.toString()
        );
      },
      async get() {
        return {
          userId: await AsyncStorage.getItem("Meteor.userId"),
          token: await AsyncStorage.getItem("Meteor.loginToken"),
          tokenExpires: await AsyncStorage.getItem("Meteor.loginTokenExpires")
        };
      }
    });
  }

  usernameRef = React.createRef();
  passwordRef = React.createRef();

  onPressSend = async () => {
    const username = this.usernameRef.current.input._lastNativeText;
    const password = this.passwordRef.current.input._lastNativeText;
    this.usernameRef.current.input.clear();
    this.passwordRef.current.input.clear();
    Keyboard.dismiss();
    try {
      await loginWithPassword({ username, password }, this.props.client);
      const myUserId = await AsyncStorage.getItem("Meteor.userId");
      
      this.props.dispatch(ChatActions.setUserId(myUserId));
      await this.props.screenProps.reinitClient();
    } catch (e) {
      console.log("e", e);
      Alert.alert("Error");
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? heightPercentageToDP("9.5202%") : 0
          }
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: colors.BLUE
          }}
        >
          <View
            style={{
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              justifyContent: "space-around"
            }}
          >
            <Input ref={this.usernameRef} placeholder="Username" />
            <Input ref={this.passwordRef} placeholder="Password" />
            <Button
              title="Send"
              onPress={this.onPressSend}
              color={colors.WHITE}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect()(withApollo(Login));
