import React, { Component } from 'react';
import { Text, Pressable, View, StyleSheet, Image, ScrollView} from 'react-native';

export default class home extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.gambar} source={require('../assets/icon1.png')} />
        <View style={styles.bargo}>
          <Text style={styles.header}>ANTAR - JEMPUT EXPRESS</Text>
          <Text style={styles.sub}>
          Kamu cukup duduk manis dirumah sambil nonton drakor kesayangan, masalah cucian sampe setrikaan biar kami yang kerjakan.
          </Text>
          <Pressable
            style={styles.button}
            onPress={()=>{this.props.navigation.navigate("MapsScreen")}}>
            <Text style={styles.btext}>Order Sekarang</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  gambar: {
    marginTop: '10%',
    width: 180,
    height: 180,
    marginBottom: 35,
  },

  bargo: {
    width: '85%',
    height: 350,
    backgroundColor: '#2396f2',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },

  header: {
    fontSize: 38,
    color: '#fff',
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: 'center',
  },

  sub: {
    width: '85%',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 30,
  },

  btext: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: 'black',
  },
});
