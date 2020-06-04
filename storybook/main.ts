import { AsyncStorage } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

// import stories
configure(() => {
  require('./stories');
  require('../src/DebugScreen.stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = (() => {
  try {
    return getStorybookUI({
      // @ts-ignore: I'm just following the docs leave me alone
      asyncStorage: AsyncStorage,
    });
  }
  catch (e) {
    if (e.name === 'TypeError') {
      // during test runs/storyshots for some reason; tests still work
      return null;
    }
    else {
      throw e;
    }
  }
})();

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
// AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
