import { StyleSheet } from "react-native";
import colors from "../../common/styling/colors";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../helpers/convertToDP";
import fonts from "../../common/styling/fonts";

export const styles = StyleSheet.create({
  rootView: {},
  stampContainer: isOwnMessage => {
    let style = {
      marginHorizontal: widthPercentageToDP("4.26667%"),
      flexDirection: "row",
      alignItems: "flex-end"
    };
    if (isOwnMessage) {
      style.alignSelf = "flex-end";
    }
    return style;
  },
  stampTime: {
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    color: "#ccc"
  },
  chatBubbleContainer: isOwnMessage => {
    let style = {
      flexDirection: "row"
    };
    if (isOwnMessage) {
      style.alignSelf = "flex-end";
    }
    return style;
  },
  chatBubble: isOwnMessage => ({
    maxWidth: widthPercentageToDP("69.6%"),
    backgroundColor: isOwnMessage ? colors.BLUE : colors.LIGHT_GREY,
    borderRadius: heightPercentageToDP("1%"),
    marginHorizontal: widthPercentageToDP("4.26667%"),
    marginTop: heightPercentageToDP("2%")
  }),
  text: isOwnMessage => ({
    margin: heightPercentageToDP("2.9985"),
    fontFamily: fonts.REGULAR,
    lineHeight: 21,
    fontSize: 14,
    color: isOwnMessage ? colors.WHITE : colors.BLACK
  })
});
