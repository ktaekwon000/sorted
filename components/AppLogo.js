import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/sorted_black_transparentbg.png")}
    style={{ width: 426, height: 308 }}
  />
);

export default AppLogo;
