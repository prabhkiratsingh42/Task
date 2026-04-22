/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import App from './App';
import {name as appName} from './app.json';

// Must be called before any navigator is mounted
enableScreens();

AppRegistry.registerComponent(appName, () => App);
