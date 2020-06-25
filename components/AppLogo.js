import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/Sorted_Logo.png")}
    style={{ width: 213, height: 204 }}
  />
);

export default AppLogo;
