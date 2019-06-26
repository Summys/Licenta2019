import React, { PureComponent } from "react";
import { Image, StyleSheet } from "react-native";
import COLORS from "../styling/colors";

class ProfileImage extends PureComponent {
  render() {
    const { size } = this.props;
    return (
      <Image
        source={require("../../assets/images/FakeAvatar.png")}
        style={[style[size]]}
      />
    );
  }
}

const style = StyleSheet.create({
  small: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  mid: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  large: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: COLORS.WHITE
  }
});

export default ProfileImage;
