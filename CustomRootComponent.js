import { registerRootComponent } from 'expo';

import ProdApp from './App';
import TestApp from './App.test';

// change to true for testing
// sorry for global env
global.isTestingEnvironment = false;

registerRootComponent(!global.isTestingEnvironment ? ProdApp : TestApp);
