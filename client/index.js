/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import "core-js";
import WithProvider from "./src/helpers/withProvider";
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => WithProvider);
