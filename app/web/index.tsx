import {AppRegistry} from 'react-native-web';
import App from '../App';
import {installFonts} from './fonts';

installFonts();

AppRegistry.registerComponent('Cutline', () => App);
AppRegistry.runApplication('Cutline', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
