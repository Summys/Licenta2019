import React, { Component } from "react";
import { View } from "react-native";
import FONTS from "../../common/styling/fonts";
import ProfileImage from "../../common/components/ProfileImage";
import SearchBar from "../../common/components/SearchBar";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
// import loginWithPassword from "../../graphql/mutations/loginWithPassword";
import createChatOneToOne from "../../graphql/mutations/createChatOneToOne";
import { loginWithPassword, setTokenStore } from "meteor-apollo-accounts";
import AsyncStorage from "@react-native-community/async-storage";
import createMessage from "../../graphql/mutations/createMessage";
import chat from "../../graphql/subscriptions/chat";
import ChatActions from "../../redux/chatReducer";
import ChatList from "./ChatList";
import OfflineNotice from "../../common/components/NetworkConnectivity";

class Dashboard extends Component {
  static navigationOptions() {
    return {
      title: "Messages",
      headerStyle: {
        borderBottomWidth: 0
      },
      headerRightContainerStyle: {
        paddingHorizontal: 16
      },
      headerTitleStyle: {
        fontFamily: FONTS.BOLD,
        fontSize: 14
      },
      headerRight: <ProfileImage size="mid" />
    };
  }

  state = {
    loading: true
  };

  componentDidMount() {
    console.log("intra in did mount");
    setTimeout(() => {
      const subscribe = this.props.client.subscribe({
        query: chat
      });
      console.log("subscribe", subscribe);
      subscribe.subscribe({
        next: ({ data: { chat } }) => {
          console.log("chat", chat);
          switch (chat.__typename) {
            case "ChatRootEvent":
              this.props.dispatch(ChatActions.setChatRooms(chat.chatPayload));
              break;
            case "ChatRoomUpdatedEvent":
              this.props.dispatch(
                ChatActions.updateRoom(chat.updateRoomPayload)
              );
              break;
            case "ChatNewMessageEvent":
              this.props.dispatch(
                ChatActions.addNewMessage(
                  chat.newMessagePayload,
                  chat.newMessagePayload.chatRoomId
                )
              );
              break;
          }
        }
      });
    }, 200);
  }

  addMessages = async () => {
    const result = await this.props.client.mutate({
      mutation: createChatOneToOne,
      variables: {
        targetUserId: "SLBtASDDb4FdZ6G4m"
      }
    });
    console.log("result", result);
    const {
      data: {
        createOneToOneChatRoom: { _id }
      }
    } = result;

    const resultMessage = await this.props.client.mutate({
      mutation: createMessage,
      variables: {
        input: {
          chatRoomId: _id,
          text: "Hello W"
        }
      }
    });
  };

  render() {
    const { navigation, isLoading } = this.props;
    if (isLoading) return <View />;
    return (
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <SearchBar onPress={this.addMessages} />
        <OfflineNotice />
        <ChatList navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.chat.isLoading
});

export default connect(mapStateToProps)(withApollo(Dashboard));
