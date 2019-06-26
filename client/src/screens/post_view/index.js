import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import ChatBubble from "./ChatBubble";
import createMessage from "../../graphql/mutations/createMessage";
import { withApollo } from "react-apollo";
import moment from "moment";
import fonts from "../../common/styling/fonts";
import { setNewChatRoomViewDate } from "../../graphql/mutations/setNewChatRoomViewDate";
import Input from "../../common/components/Input";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../../helpers/convertToDP";
import uuidv4 from "uuid/v4";

class ChatRoom extends PureComponent {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.getParam("username"),
      headerStyle: {
        borderBottomWidth: 0
      },
      headerRightContainerStyle: {
        paddingHorizontal: 16
      },
      headerTitleStyle: {
        fontFamily: fonts.BOLD,
        fontSize: 16
      }
    };
  }
  state = {
    isLoading: false
  };

  sendMessageRef = React.createRef();

  //   handleAddStory = async () => {
  //   await client.mutate({
  //     variables: {
  //       data: {
  //         name,
  //         description,
  //         isActive,
  //       },
  //     },
  //     mutation: ADD_STORY,
  //     optimisticResponse,
  //     update: (cache, { data: { storyCreate } }) => {
  //       const { stories } = cache.readQuery({
  //         query: QUERY_STORIES,
  //         variables: { filters: {}, options: {} },
  //       });
  //       stories.push(storyCreate);
  //       cache.writeQuery({
  //         query: QUERY_STORIES,
  //         variables: { filters: {}, options: {} },
  //         data: { stories },
  //       });
  //     },
  //     context: {
  //       type: 'isCreate',
  //       replaceId: 'storyId',
  //     },
  //   });
  //   Navigation.pop(componentId);
  // };

  onPressSend = () => {
    this.currentText = this.sendMessageRef.current.input._lastNativeText;
    const { currentChatRoom } = this.props;
    this.sendMessageRef.current.input.clear();
    Keyboard.dismiss();
    const optimisticResponse = {
      __typename: "Mutation",
      createMessage: {
        __typename: "ChatMessage",
        _id: uuidv4(),
        text: this.currentText,
        chatRoomId: currentChatRoom._id,
        createdAt: new Date().toJSON()
      }
    };
    if (this.lastText !== this.currentText) {
      this.props.client
        .mutate({
          mutation: createMessage,
          variables: {
            input: {
              text: this.currentText,
              chatRoomId: currentChatRoom._id
            }
          },
          optimisticResponse,
          context: {
            type: "isCreate"
          }
        })
        .then(data => console.log("data", data));
    }
    this.lastText = this.currentText;
  };

  componentWillMount() {
    const { currentChatRoom } = this.props;
    if (currentChatRoom) this.setChatRoomViewDate(currentChatRoom._id);
  }

  renderMessage = ({ item }) => (
    <ChatBubble
      isOwnMessage={item.userId === this.props.myUserId}
      messageData={{ text: item.text }}
      isStampShown
      name={item.user.username}
      time={moment(item.createdAt).format("HH:mm")}
    />
  );

  onPressText = () => {
    this.input.focus();
  };

  onFocusTextInput = () => {
    if (this.props.currentChatRoom) {
      this.setChatRoomViewDate(this.props.currentChatRoom._id);
    }
  };

  setChatRoomViewDate = id => {
    this.props.client.mutate({
      mutation: setNewChatRoomViewDate,
      variables: {
        chatRoomId: id
      }
    });
  };

  componentWillUpdate(nextProps) {
    const { currentChatRoom } = this.props;
    if (!currentChatRoom && nextProps.currentChatRoom) {
      this.setChatRoomViewDate(nextProps.currentChatRoom._id);
    }
    if (
      currentChatRoom &&
      nextProps.currentChatRoom._id !== currentChatRoom._id
    ) {
      this.setChatRoomViewDate(nextProps.currentChatRoom._id);
    }
  }

  render() {
    if (!this.props.currentChatRoom) {
      return null;
    }
    const { messages } = this.props.currentChatRoom;
    return (
      <SafeAreaView style={{ height: heightPercentageToDP("90.4797%") }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : null}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? heightPercentageToDP("9.5202%") : 0
          }
          contentContainerStyle={{ height: heightPercentageToDP("90.4797%") }}
        >
          <FlatList
            style={{ height: heightPercentageToDP("82.6836%") }}
            inverted
            bounces={false}
            data={[...messages].reverse()}
            renderItem={this.renderMessage}
          />
          <View
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              marginHorizontal: widthPercentageToDP("4%"),
              marginTop: heightPercentageToDP("0.7496%"),
              height: heightPercentageToDP("7.7961%"),
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback onPress={this.onPressText}>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Input
                  ref={this.sendMessageRef}
                  placeholder="Write a message.."
                  onFocus={this.onFocusTextInput}
                />
              </View>
            </TouchableWithoutFeedback>
            <Button title="Send" onPress={this.onPressSend} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

ChatRoom.defaultProps = {};

const mapStateToProps = state => ({
  currentChatRoom: state.chat.currentChatRoom,
  myUserId: state.chat.myUserId
});

export default connect(mapStateToProps)(withApollo(ChatRoom));
