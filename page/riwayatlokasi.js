import React, { Component } from "react"
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from "expo-constants";
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, getDocs, collection, deleteDoc} from "firebase/firestore"; 
import { Pressable,HStack } from 'native-base'

export default class RiwayatLokasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      dblatitude: 0,
      dblongitude: 0,
      errorMessage: null,
    };
  }

  DeleteRecord=()=>{
    this.setState({ isLoading: true });
    var Alamat = this.state.alamat;
    const { navigation } = this.props;
    deleteDoc(doc(firebase,"Alamat", Alamat))
      .then(() => {
        this.setState({ isLoading: false });
          console.log("data berhasil dihapus");
          Alert.alert("Pemberitahuan","data berhasil dihapus!");
          navigation.goBack();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert("Pemberitahuan","data gagal dihapus!");
          setError(error.message);
      })
  }
  
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      getDocs(collection(firebase, "lokasi")).then((docSnap) => {
        let users = [];
        docSnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
            latitude: users[0].latitude,
            longitude: users[0].longitude,
        });
      });
    }
  }

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
          <View style={{flex: 0.1, alignItems: 'center', height: 50, backgroundColor: '#53ACF4',
            paddingTop: 50}}>
            <Text>Riwayat Lokasi</Text>
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
                     title="Riwayat Lokasi"
                     description={`Latitude: ${this.state.latitude}, Longitude: ${this.state.longitude}`}
                />
            </MapView>
          </View>
          <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.DeleteRecord();}}
                        bg="#57D1D1"
                        borderRadius="15"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 10,
                        }}
                    >
                        <Text  fontSize="20" color="#000000" fontWeight="bold">
                            Hapus Riwayat
                        </Text>
                    </Pressable>
                    </HStack>
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
