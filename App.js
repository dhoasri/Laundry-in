import React from 'react';
import { NativeBaseProvider, Icon, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SignIn from "./page/signin.js";
import SignUp from "./page/signup.js";
import front from "./page/front.js";
import Home from "./page/home.js";
import Maps from "./page/maps.js";
import RiwayatLokasi from "./page/riwayatlokasi.js";
import Profil from "./page/profil.js";
import Pesanan from "./page/pesanan";
import Riwayat from './page/riwayat.js';

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
          } else if (route.name === 'Riwayat Order') {
            iconName = 'history';
          } else if (route.name === 'Profil') {
            iconName = 'account';
          } 
          return (
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size={9}
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
          backgroundColor: '#99D2FF'
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          headerShown: true,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Riwayat Order"
        component={Riwayat}
        options={{
          unmountOnBlur: true,
          headerShown: true,
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
          headerShown: true,
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
          <Stack.Screen
            name="RiwayatLokasi"
            component={RiwayatLokasi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ headerShown: false}}
          />
          <Stack.Screen
          name="Pesanan"
          component={Pesanan}
          options={{ headerShown: false}}
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

export default createAppContainer(RootNavigator);
