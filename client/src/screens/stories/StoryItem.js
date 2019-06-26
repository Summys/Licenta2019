/* eslint-disable no-underscore-dangle */
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import REMOVE_STORY from "../../graphql/mutations/storyDelete";
import QUERY_STORIES from "../../graphql/queries/getChatRoom";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../helpers/convertToDP";
import FONTS from "../../common/styling/fonts";
import COLORS from "../../common/styling/colors";

const deleteStoryOptimistic = (storyId, client) => {
  const { stories } = client.readQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} }
  });
  const storyIndex = stories.findIndex(story => story._id === storyId);
  stories.splice(storyIndex, 1);
  client.writeQuery({
    query: QUERY_STORIES,
    variables: { filters: {}, options: {} },
    data: { stories }
  });
};

const handleDeleteStory = async (storyId, client) => {
  const optimisticResponse = {
    __typename: "Mutation",
    storyDelete: {
      __typename: "StoryDeleteSuccess",
      _id: storyId
    }
  };
  await client.mutate({
    variables: { storyId },
    mutation: REMOVE_STORY,
    optimisticResponse,
    update: deleteStoryOptimistic(storyId, client)
  });
};

// const handleEditStory = (componentId, item) => {
//   Navigation.push(componentId, {
//     component: {
//       name: EDIT_STORY_SCREEN,
//       passProps: item,
//     },
//   });
// };

const StoryItem = ({
  username,
  text,
  timestamp,
  onPress,
  missedMessageCount
}) => (
  <TouchableHighlight onPress={onPress}>
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        height: heightPercentageToDP("7.4962%"),
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <View
        style={{
          width: widthPercentageToDP("13.3333%"),
          height: widthPercentageToDP("13.3333%")
        }}
      >
        <Image
          source={{ uri: "profile" }}
          resizeMode="contain"
          style={{
            borderWidth: 1,
            borderColor: "#fff",
            borderRadius: widthPercentageToDP("6.6666%"),
            width: "100%",
            height: "100%"
          }}
        />
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.GREEN,
            width: widthPercentageToDP("4%"),
            height: widthPercentageToDP("4%"),
            borderRadius: widthPercentageToDP("2%"),
            borderWidth: 1,
            borderColor: COLORS.WHITE,
            justifyContent: "center",
            marginTop: 4
          }}
        />
      </View>
      <View
        style={{
          width: widthPercentageToDP("48.86667%"),
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONTS.MEDIUM,
            color: COLORS.BLACK
          }}
        >
          {username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.REGULAR,
            color: COLORS.DARK_GREY
          }}
        >
          {text.length > 65 ? `${text.slice(0, 65)}...` : text}
        </Text>
      </View>
      <View
        style={{
          width: widthPercentageToDP("25.3333%"),
          height: widthPercentageToDP("13.3333%"),
          alignItems: "flex-end",
          paddingTop: 6
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: FONTS.REGULAR,
            color: COLORS.BLACK
          }}
        >
          {timestamp.fromNow()}
        </Text>
        {missedMessageCount !== 0 && (
          <View
            style={{
              backgroundColor: COLORS.BLUE,
              width: widthPercentageToDP("4.2666%"),
              height: widthPercentageToDP("4.2666%"),
              borderRadius: widthPercentageToDP("2.1333%"),
              justifyContent: "center",
              marginTop: 4
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: COLORS.WHITE,
                textAlign: "center"
              }}
            >
              {missedMessageCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  </TouchableHighlight>
);

StoryItem.propTypes = {
  client: PropTypes.instanceOf(Object).isRequired
};

export default withApollo(StoryItem);
