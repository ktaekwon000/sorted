import React from 'react';
import { decode, encode } from 'base-64';
import AppContainer from './navigation';
import Firebase, { FirebaseProvider } from './config/Firebase';

// fix firebase issues
// do not remove, fixes firebase
import TimerFix from './config/Firebase/TimerFix'; // eslint-disable-line
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
