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
  'Deprecation warning: support for custom functionreporters',
]);

const testHookStore = new TestHookStore();

export default function App() {
  return (
    <Tester
      specs={[Spec]}
      store={testHookStore}
      reporter={(report) => console.log(report.fullResults)} // eslint-disable-line
      only={[
        // 'authUI',
        // 'authSystem',
        // 'entryUI',
        // 'entrySystem',
        // 'emotionsUI',
        // 'emotionsSystem' /* This test takes almost 2 minutes on its own! */,
        'misc',
      ]}
    >
      <FirebaseProvider value={Firebase}>
        <AppContainer />
      </FirebaseProvider>
    </Tester>
  );
}
