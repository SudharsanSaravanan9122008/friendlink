import React, { Component } from 'react';
import { AppState, Platform } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LogoutScreen from './screens/LogoutScreen';
import VerifyScreen from './screens/VerifyScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import { setOffline, setOnline, setLastSeen, updateProfilePhoto } from './components/databaseHandler';
import ProfilePhotoScreen from './screens/ProfilePhotoScreen';
import ProfileInfoScreen from './screens/ProfileInfoScreen';

GoogleSignin.configure({
  webClientId: '906719019997-7p44jsusf7lq3v86cvugbe18l5835dbp.apps.googleusercontent.com',
});

const Stack = createStackNavigator()

global.userExistInDb = false;
global.darkMode = true;
class App extends Component {
  constructor(props){
    super(props);
    this.appStateListener = () => {
      if (AppState.currentState === 'background') {
        setLastSeen();
        setOffline();
      }
      if (AppState.currentState === "active") {
        setOnline();
      }
    };
  }

  componentDidMount() {
    setOnline();
    global.apiLevel = Platform.Version;
    updateProfilePhoto();
    AppState.addEventListener('change', this.appStateListener);
  }

  componentWillUnmount() {
    setLastSeen();
    setOffline()
    AppState.removeEventListener('change', this.appStateListener);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Logout' component={LogoutScreen} />
          <Stack.Screen name='Verify' component={VerifyScreen} />
          <Stack.Screen name='CreateUser' component={CreateUserScreen} />
          <Stack.Screen name='Chat' component={ChatScreen} />
          <Stack.Screen name='Settings' component={SettingsScreen} />
          <Stack.Screen name='ProfilePhoto' component={ProfilePhotoScreen} />
          <Stack.Screen name='ProfileInfo' component={ProfileInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;


