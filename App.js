import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SignIn from "./page/sigin.js";
import SignUp from "./page/signup.js";
import front from "./page/front.js";
import Home from "./page/home.js";
import Maps from "./page/maps.js";
import RiwayatLokasi from "./page/riwayatlokasi.js";

const screens = {
  SignInScreen: {
    screen: SignIn,
  },
  SignUpScreen: {
    screen: SignUp,
  },
  HomeScreen: {
    screen: Home,
  },
  MapsScreen: {
    screen: Maps,
  },
  RiwayatLokasiScreen: {
    screen: RiwayatLokasi,
  },
};

const App = createStackNavigator(
  screens,
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2396f2",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  {initialRouteName: 'SignInScreen'}
);

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
