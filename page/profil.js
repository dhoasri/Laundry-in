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
import { doc, setDoc, updateDoc, where } from "firebase/firestore"; 
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
    navigation.navigate('Login');
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
            marginTop: Constants.statusBarHeight,
          }}>
          <Flex style={{ flex: 15 }} p={0} direction="row"  px={5}>
            <Image source={require('../assets/logo.png')} alt="Judul Logo"  style={{ width: 200, height: 130}}/>
            <Spacer />
            <Text mt="10" fontSize="xl" bold>Profil</Text>
          </Flex> 
          <Box height={"60%"} width={"100%"} bg="#FFFFFF" style={{ flex: 85 }} borderTopRadius="50" >
            <Center>
                <Box mt="10" borderRadius="100" borderColor="#57D1D1" borderWidth="1" shadow="9" bg="#FFFFFF" w="75" h="75" justifyContent={"center"} alignItems={"center"}>
                    <Icon
                        name="user"
                        size={30}
                        color='#000000'
                    />
                </Box>
                <ScrollView>
                <FormControl w="95%" pt="20%" >
                  <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Email</Text>
                    </FormControl.Label> 
                    <Center>
                        <Box mb="5" borderRadius="20" shadow="3" bg="#F0FFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3" justifyContent={"center"} px="5">
                            <Text fontSize="2xl">{this.state.email}</Text>
                        </Box>
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Username</Text>
                    </FormControl.Label> 
                    <Center>
                        <Box mb="5" borderRadius="20" shadow="3" bg="#F0FFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3" justifyContent={"center"} px="5">
                            <Text fontSize="2xl">{this.state.username}</Text>
                        </Box>
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Password</Text>
                    </FormControl.Label>
                    <Center>
                        <Box mb="10" borderRadius="20" shadow="3" bg="#FFFFFF" w="95%" h="75" borderColor="#57D1D1" borderWidth="3">
                            <Input
                                w="100%" h="70"
                                borderRadius="20" borderWidth="1"
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
                                    mr="3"
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
                        </Box>
                    </Center>
                </FormControl>
                <HStack mb="5" px="5">
                    <Pressable
                        onPress={() => {this.UpdateData();}}
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
                            Update Profil
                        </Text>
                    </Pressable>
                    <Spacer/>
                    <Pressable
                        onPress={()=>{this.props.navigation.navigate("SignInScreen")}}
                        bg="#DC143C"
                        borderRadius="15"
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "43%",
                            padding: 10,
                        }}
                    >
                        <Text  fontSize="20" color="#DCDCDC" fontWeight="bold">
                            LogOut
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
