
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlaces/SharePlaces';
import FindPlacesScreen from './src/screens/FindPlaces/FindPlaces';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

Navigation.registerComponent('share-moments.AuthScreen', () => AuthScreen,store,Provider);
Navigation.registerComponent('share-moments.SharePlaceScreen', () => SharePlaceScreen,store,Provider);
Navigation.registerComponent('share-moments.FindPlaceScreen', () => FindPlacesScreen,store,Provider);
Navigation.registerComponent('share-moments.PlaceDetailScreen', () => PlaceDetailScreen,store,Provider);
Navigation.registerComponent('share-moments.SideDrawer', () => SideDrawer,store,Provider);






 export default () => Navigation.startSingleScreenApp({
  screen:{
    screen:"share-moments.AuthScreen",
    title:'Login'
  }

});
