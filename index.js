/**
 * @format
 */
import {AppRegistry} from 'react-native';
import ProviderContainer from './src/ProviderContainer';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ProviderContainer);
