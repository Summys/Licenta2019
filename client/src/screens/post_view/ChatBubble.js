import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { styles } from "./ChatBubbleStyles";

class ChatBubble extends PureComponent {
  render() {
    const {
      messageData: { text },
      isOwnMessage,
      isStampShown,
      time
    } = this.props;

    return (
      <View style={styles.rootView}>
        <View style={styles.chatBubbleContainer(isOwnMessage)}>
          <View style={styles.chatBubble(isOwnMessage)}>
            <Text style={styles.text(isOwnMessage)}>{text}</Text>
          </View>
        </View>
        {isStampShown && (
          <View style={styles.stampContainer(isOwnMessage)}>
            <Text style={styles.stampTime}>{time}</Text>
          </View>
        )}
      </View>
    );
  }
}

ChatBubble.defaultProps = {
  isOwnMessage: false,
  isStampShown: false,
  name: "",
  time: ""
};

export default ChatBubble;
