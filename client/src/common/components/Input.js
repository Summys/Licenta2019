import React, { PureComponent } from "react";
import { TextInput, StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "../../helpers/convertToDP";
import colors from "../styling/colors";
import fonts from "../styling/fonts";

export default class Input extends PureComponent {
  render() {
    const { props } = this;
    return (
      <TextInput
        ref={input => {
          this.input = input;
        }}
        disableFullscreenUI
        placeholderTextColor={colors.DARK_GREY}
        style={style.input}
        {...props}
      />
    );
  }
}

const style = StyleSheet.create({
  input: {
    height: heightPercentageToDP("5.3973%"),
    width: widthPercentageToDP("74.4%"),
    borderRadius: heightPercentageToDP("2.6986%"),
    backgroundColor: colors.SEARCH_BACKGROUND,
    color: colors.BLACK,
    paddingLeft: widthPercentageToDP("4.2667%"),
    fontFamily: fonts.REGULAR,
    fontSize: 12
  }
});
