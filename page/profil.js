import React, { Component } from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Alert, ActivityIndicator  } from "react-native";
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
  Flex,
  Spacer,
  Center,
  NativeBaseProvider,
  Slide,
  View,
  ScrollView,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Icon from 'react-native-vector-icons/FontAwesome';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc, deleteDoc,updateDoc, where } from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Riwayat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      check_textInputChange: false,
      secureTextEntry: true,
    };
  }

  get = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const username = await AsyncStorage.getItem('username');
      if(email !== null && username !== null) {
          this.setState({email: email, username: username });
      }
    }  catch (e){
      console.error(e);
    }
  }

  componentDidMount(){
    this.get();
  }

  UpdateData = () => {
    var Username = this.state.username;
    var Password = this.state.password;
    updateDoc(doc(firebase, "user", Username),{
      password: Password
    })
    .then(() => {
        console.log("Password Berhasil DiUpdate");
        Alert.alert("Pemberitahuan","Password Berhasil DiUpdate");
    })
    .catch(error => {
        console.log(error);
    })
  };

  logOut = async() => {
    const { navigation } = this.props;
    AsyncStorage.clear();
    navigation.navigate('Login')
    .then(() => {
      console.log("Password Berhasil DiUpdate");
      Alert.alert("Pemberitahuan","Password Berhasil DiUpdate");
  })
  .catch(error => {
      console.log(error);
  })
  }

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }


  render() {
    return (
      <NativeBaseProvider bg="#57D1D1">
        <VStack flex="1" justifyContent={"center"} alignItems={"center"} bg="#dbe4f3" style={{
            marginTop: 1,
          }}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require('../assets/logo.png')} alt="Logo"  style={{ width: 200, height: 130}}/>

          </Flex> 
          <Box height={"10%"} width={"100%"} marginTop={5} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="20" >
            <Center>
                
                <ScrollView>
                <FormControl w="95%" pt="20%" >
                
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">username</Text>
                    </FormControl.Label>
                    <Center>
                      <Input
                                w="95%" h="55"
                                borderRadius="10" borderWidth="1" borderColor="#2396f2"
                                mb="5"
                                size="2xl"
                                variant="underlined"
                                p={2}
                                fontWeight="400"
                                fontFamily="mono"
                                placeholderTextColor="#57D1D1"
                                onChangeText={(username) => this.setState({ username })}
                                
                            />
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Password</Text>
                    </FormControl.Label>
                    <Center>
                      <Input
                                w="95%" h="55"
                                borderRadius="10" borderWidth="1" borderColor="#2396f2"
                                mb="5"
                                size="2xl"
                                variant="underlined"
                                p={2}
                                fontWeight="400"
                                fontFamily="mono"
                                placeholderTextColor="#57D1D1"
                                secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(password) => this.setState({ password })}
                                InputRightElement={
                                    <Pressable
                                    mr="5"
                                    onPress={this.updateSecureTextEntry.bind(this)}
                                    >
                                    {this.state.secureTextEntry ? (
                                        <Feather name="eye-off" color="#000000" size={20} />
                                    ) : (
                                        <Feather name="eye" color="#808080" size={20} />
                                    )}
                                    </Pressable>
                                }
                            />
                    </Center>
                </FormControl>
                <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.UpdateData();}}
                        bg="#6DC6F9"
                        borderRadius="5"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 10,
                        }}>
                        <Text  fontSize="15" color="#ffff" fontWeight="bold">
                            Update Profil
                        </Text>
                    </Pressable>
                    <Spacer/>
                    <Pressable
                        onPress={()=>{this.props.navigation.navigate("SignIn")}}
                        bg="#C72928"
                        borderRadius="5"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 13,
                        }}>
                        <Text  fontSize="15" color="#ffff" fontWeight="bold">
                            Keluar
                        </Text>
                    </Pressable>
                   
                </HStack>
                </ScrollView>
            </Center>
          </Box>
        </VStack>
      </NativeBaseProvider>
    );
  }
}
