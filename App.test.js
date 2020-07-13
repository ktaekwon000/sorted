import React from 'react';
import { YellowBox } from 'react-native';
import { decode, encode } from 'base-64';

import { Tester, TestHookStore } from 'cavy';
import Spec from './specs/spec';

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

YellowBox.ignoreWarnings([
  "Warning: Can't perform a React state update on an unmounted",
]);

const testHookStore = new TestHookStore();

export default function App() {
  return (
    <Tester specs={[Spec]} store={testHookStore}>
      <FirebaseProvider value={Firebase}>
        <AppContainer />
      </FirebaseProvider>
    </Tester>
  );
}
