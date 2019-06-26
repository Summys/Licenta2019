import React, { Component } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import StoryItem from "../stories/StoryItem";
import StoryItemSeparator from "../stories/StoryItemSeparator";
import moment from "moment";
import SCREENS from "../../enums/screensEnum";
import ChatActions from "../../redux/chatReducer";

class ChatList extends Component {
  render() {
    const {
      navigation: { push },
      dispatch
    } = this.props;
    console.log("this.props chatList", this.props);
    return (
      <FlatList
        style={{ flex: 1, paddingTop: 20 }}
        data={this.props.rooms}
        keyExtractor={item => item._id}
        renderItem={({
          item: {
            metaData: {
              lastMessage = {},
              partner: { username },
              missedMessageCount
            },
            _id
          }
        }) => {
          const { text, createdAt } = lastMessage || { text: '', createdAt: ''}
          return (
            <StoryItem
              onPress={() => {
                dispatch(ChatActions.setCurrentRoomById(_id));
                push(SCREENS.POST_VIEW, { text, username });
              }}
              text={text}
              username={username}
              timestamp={moment(createdAt)}
              missedMessageCount={missedMessageCount}
            />
          );
        }}
        ItemSeparatorComponent={() => <StoryItemSeparator />}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.chat.chatRooms
  };
};

export default connect(mapStateToProps)(ChatList);
