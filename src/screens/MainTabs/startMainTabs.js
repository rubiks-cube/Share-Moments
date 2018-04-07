import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

 const startTabs = () =>{
     Promise.all([
        Icon.getImageSource("md-map",30),
        Icon.getImageSource("ios-share-alt",30),
        Icon.getImageSource("ios-menu",30)
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
            drawer:{
                left:{
                  screen: 'share-moments.SideDrawer'
                }
            }
        
        });
     })
   


 };

 export default startTabs;
