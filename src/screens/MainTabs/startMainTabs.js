import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

 const startTabs = () =>{
     Promise.all([
        Icon.getImageSource(Platform.OS==="androoid"?"md-map":"ios-map",30),
        Icon.getImageSource(Platform.OS==="androoid"?"md-share-alt":"ios-share-alt",30),
        Icon.getImageSource(Platform.OS==="androoid"?"md-menu":"ios-menu",30)
     ]).then(sources => {

        Navigation.startTabBasedApp({
            tabs: [
              {
                  screen: 'share-moments.FindPlaceScreen',
                  label: 'Find Places',
                  title:'Find Places',
                  icon: sources[0],
                  navigatorButtons:{
                     leftButtons:[
                         {
                             icon:sources[2],
                             title:"Menu",
                             id:"SideDrawerToggle"
                         }
                     ]
                  }
        
              },
              {
                screen: 'share-moments.SharePlaceScreen',
                label: 'SharePlaces',
                title:'Share Places',
                icon: sources[1],
                navigatorButtons:{
                    leftButtons:[ 
                        {
                            icon:sources[2],
                            title:"Menu",
                            id:"SideDrawerToggle"
                        }
                    ]
                 }
        
            }
              
            ],
            appStyle:{
                tabBarSelectedButtonColor:"blue"
            },
            drawer:{
                left:{
                  screen: 'share-moments.SideDrawer'
                }
            }
        
        });
     })
   


 };

 export default startTabs;
