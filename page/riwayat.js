import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Box,
  Text,
  Pressable,
  Heading,
  Link,
  KeyboardAvoidingView,
  VStack,
  FormControl,
  Input,
  extendTheme,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Flex, 
  Spacer,
  Slide,
  View,
  FlatList,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, getDocs, collection, where, deleteDoc, DeleteRecord} from "firebase/firestore"; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Riwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      email: "",
      data: [],
    };
  }

  get = async () => {
    try {
      const nama = await AsyncStorage.getItem('nama')
      const email = await AsyncStorage.getItem('email');
      if(nama !== null && username !== null) {
          this.setState({nama: nama, email: email });
      }
    }  catch (e){
      console.error(e);
    }
  }


  componentDidMount(){
    this.get();
    const nama = this.state.nama;
    const dataa = this.state.data;
    getDocs(
      collection(firebase, "Alamat"),where('nama', '==', nama)
      ).then(docSnap => {
      let data = [];
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), 
          id: doc.id
        });
        console.log(doc.data());
      });
      this.setState({data});
      
    });
    
  }

    
  DeleteRecord=()=>{
    this.setState({ isLoading: true });
    var Alamat = this.state.data[0].alamat;
    const { navigation } = this.props;
    deleteDoc(doc(firebase,"Alamat", Alamat))
      .then(() => {
        this.setState({ isLoading: false });
          console.log("data berhasil dihapus");
          Alert.alert("Pemberitahuan","Riwayat berhasil dihapus!");
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert("Pemberitahuan","Riwayat gagal dihapus!");
          setError(error.message);
      })
  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    if(item.username == this.state.username){
      const data = {alamat: item.alamat,  nama: item.nama, nomor: item.nomor};
      return(
        <>
          <Center>
          <Pressable
              mt='2'
              borderRadius="15" 
              borderColor="#2396f2" 
              borderWidth="1" 
              shadow="2" 
              bg="#FFFFFF" 
              w="95%" 
              h="75"  
              justifyContent={"center"}
              overflow="hidden"
              onPress={() => navigation.navigate('RiwayatLokasi', {data})}
            >
              <Flex style={{ flex: 1 }} p={0} direction="row"  px={5} alignItems={"center"}>
                <Icon
                  name="history"
                  size={30}
                  color='#000000'
                />
                <Box>
                  <Text style={{paddingLeft: 15, fontSize: 21, fontWeight: "bold"}}>{data.nama}</Text>
                  <Text style={{paddingLeft: 15, fontSize: 19}}>{data.alamat}</Text>
                  <Text style={{paddingLeft: 15, fontSize: 19}}>{data.nomor}</Text>
                </Box>
                <Spacer/>
                <Pressable
                        onPress={() => {this.DeleteRecord();}}
                        bg="#E63837"
                        borderRadius="5"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "23%",
                            padding: 10,
                        }}
                    >
                        <Text  fontSize="14" color="#FFFF" fontWeight="bold">
                            Hapus
                        </Text>
                    </Pressable>
              </Flex> 
              </Pressable>
          </Center>
        </>
      );
    }
  };

  render() {
    const {isLoading} = this.state;
    return (
      
      <NativeBaseProvider bg="#dbe4f3">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#dbe4f3" style={{
            marginTop: 1,
          }}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require("../assets/logo.png")} style={{ mt:"30", width: 158, height: 100}}/>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#dbe4f3" style={{ flex: 110 }} borderTopRadius="50" >
            <Center>
                <Box mt="50" mb="10" borderRadius="10" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="90%" h="550" justifyContent={"center"} alignItems={"center"}>
                  {isLoading ? (
                        <ActivityIndicator size="large" color="#AA0002"/>
                    ): (
                      <FlatList
                        width="95%"
                        data={this.state.data}
                        renderItem={this.renderItem}
                      />
                  )}
                </Box>
            </Center>
          </Box>
          
        </VStack>
      </NativeBaseProvider>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 45,
      flexDirection: 'column',
      backgroundColor: "#fff",
  },
})