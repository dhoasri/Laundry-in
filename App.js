import React from 'react';
import { NativeBaseProvider, Icon, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SignIn from "./page/sigin.js";
import SignUp from "./page/signup.js";
import front from "./page/front.js";
import Home from "./page/home.js";
import Maps from "./page/maps.js";
import RiwayatLokasi from "./page/riwayatlokasi.js";
import Profil from "./page/profil.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Maps') {
            iconName = 'google-maps';
          } else if (route.name === 'Profil') {
            iconName = 'account';
          } 
          return (
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size={30}
              color={focused ? 'primary.600' : '#ffff'}
            />
          );
        },
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? 'primary.600' : color} mb={2}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          backgroundColor: '#2396f2',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const RootNavigator = createSwitchNavigator(
  {
    App: App,
    Splash: front,
  },
  {
    initialRouteName: "Splash",
  }
);

export default App;
