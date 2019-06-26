import React from "react";
import { View } from "react-native";
import { heightPercentageToDP } from "../../helpers/convertToDP";

export default () => <View style={{ height: heightPercentageToDP("3%") }} />;
