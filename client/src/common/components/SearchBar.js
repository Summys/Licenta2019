import React, { Component } from "react";
import { TextInput, View, Image, StyleSheet } from "react-native";
import COLORS from "../styling/colors";
import FONTS from "../styling/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";

class SearchBar extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.rounded} onPress={this.props.onPress}>
        <Image source={{ uri: "search" }} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor={COLORS.DARK_GREY}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rounded: {
    width: "100%", // TODO RESPONSIVENESS
    borderRadius: 18, // TODO RESPONSIVENESS
    height: 36, // TODO RESPONSIVENESS
    backgroundColor: COLORS.SEARCH_BACKGROUND,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 6
  },
  icon: {
    width: 14,
    height: 14,
    margin: 10
  },
  textInput: {
    width: 298,
    height: 14,
    fontFamily: FONTS.REGULAR
  }
});

export default SearchBar;
