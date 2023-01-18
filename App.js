import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SignIn from "./page/sigin.js";
import SignUp from "./page/signup.js";
import front from "./page/front.js";

const screens = {
  SignInScreen: {
    screen: SignIn,
  },
  SignUpScreen: {
    screen: SignUp,
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
