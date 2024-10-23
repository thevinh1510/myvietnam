import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProviderTotal } from './data/store';

// screen import
import Onboard from './screens/Onboard';
import DataCollect from './screens/DataCollect';
import clrStyle from './assets/componentStyleSheet';
import { ColorValue } from 'react-native';

import BottomTab from './assets/BottomTab';
import Home from './screens/Home';
import Podcast from './screens/Podcast';
import Explore from './screens/Explore';
import User from './screens/User';
// >>>>>>>>>>
import BlogView from './screens/BlogView';

// ____________________END OF IMPORT_______________________

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <ProviderTotal>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: clrStyle.white as ColorValue } }}>
          {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="Onboard" component={Onboard} />
          <Stack.Screen name="DataCollect" component={DataCollect} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Podcast" component={Podcast} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="User" component={User} />
          {/* >>>> */}
          <Stack.Screen name="BlogView" component={BlogView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderTotal>
  )
}

export default App;
