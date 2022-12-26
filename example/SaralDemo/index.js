/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import MainNavigation from './navigator/navigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainNavigation);
