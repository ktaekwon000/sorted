import React from "react";
import AppContainer from "./navigation";
import Firebase, { FirebaseProvider } from "./config/Firebase";

//fix firebase issues
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  );
}
