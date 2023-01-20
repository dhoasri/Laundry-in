import React, { Component } from "react"
import { View, StyleSheet, Text, Alert, Pressable, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from "expo-constants";
import { format } from 'date-fns';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc } from "firebase/firestore"; 

export default class maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      region: null,
      latitude: 0,
      longitude: 0,
      errorMessage: null,
    };
  }
  
  InsertRecord=()=>{
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if ((latitude.length==0) || (longitude.length==0)){
        alert("Reload Aplikasi");
    }else{
      setDoc(doc(firebase, "lokasi", "lokasii"),{
        latitude: latitude,
        longitude: longitude,
        time: currentTime,
      })
      .then(() => {
          //jika login berhasil maka masuk halaman login
          console.log("data berhasil submit");
          Alert.alert("Lokasi Berhasil Disimpan");
      })
      .catch((error) => {
          //jika mengambil data gagal, akan tampil error
          setError(error.message);
      })
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({ errorMessage: 'Permission to access location was denied'});
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };

    let latitude = region.latitude;
    let longitude = region.longitude;
    this.setState({ location, region, latitude, longitude }); 
  };

  render() {
    var lttd = JSON.stringify(this.state.latitude);
    var lngtd = JSON.stringify(this.state.longitude);
    const tanda = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{flex: 0.1, alignItems: 'center', height: 50, backgroundColor: '#009387'}}>
            <Text>Lokasimu berada di:</Text>
            <Text>Latitude: {lttd} </Text>
            <Text>Longitude {lngtd} </Text>
          </View>
          <View style={{ flex: 0.9 }}>
          <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker
                     coordinate={tanda}
                     title="My Location"
                     description={`Latitude: ${this.state.latitude}, Longitude: ${this.state.longitude}`}
                />
            </MapView>
          </View>
          <View style={{flex: 0.1, flexDirection:'row', alignItems: 'center', height: 50, backgroundColor: '#009387'}}>
            <View style={[styles.box, styles.box1]}>
              <Pressable style={styles.kembaliButton} onPress={()=>{this.props.navigation.navigate("SignInScreen")}}>
                <Text style={{color: 'white'}}>Kembali</Text>
              </Pressable>  
            </View> 
            <View style={[styles.box, styles.box2]}>
              <Pressable style={styles.simpanButton}onPress={()=>{this.InsertRecord() }}>
                <Text style={styles.text}>Simpan Lokasi</Text>
              </Pressable>
            </View> 
            <View style={[styles.box, styles.box3]}>
              <Pressable style={styles.riwayatButton} onPress={()=>{this.props.navigation.navigate("RiwayatLokasiScreen")}}>
                <Text style={{color: 'white'}}>Riwayat Lokasi</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#6f00ff"
    },
    box: {
      flex: 1, 
      width: 100,
      height: 100
    },
    box1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    box2: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#8BC34A'
    },
    box3: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e3aa1a'
    },
    simpanButton: {
      backgroundColor: '#06baab',
      color: 'white',
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      borderRadius: 10,
    },
    kembaliButton: {
      backgroundColor: '#6f00ff',
      color: 'white',
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      borderRadius: 10,
    },
    riwayatButton: {
      backgroundColor: '#6f00ff',
      color: 'white',
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      borderRadius: 10,
    },
})
