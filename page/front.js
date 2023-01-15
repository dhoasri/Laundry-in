import React, { Component } from "react";
import Constants from "expo-constants";
import { Image, View,  StyleSheet} from "react-native";

export default class front extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("App");
    }, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.gambar1} source={require('../assets/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
    alignItems: 'center',
    justifyContent: 'center',
  },

  gambar1: {
    marginTop: '30%',
    width: 300,
    height: 200,
    marginBottom: 55,
  }
});