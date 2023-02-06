import React, { Component } from 'react';
import { View, TextInput,Pressable, Button, TouchableOpacity, SafeAreaView, Image, Text, Alert } from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { SceneView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from "react-native-vector-icons/Feather";
import { FormControl, Center,Input, } from 'native-base';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email : '',
            nomor : '',
            password : '',
            confirmPw : '',
            check_textInputChange : false,
            secureTextEntry : true,
            confirmSecureTextEntry : true
        };
    }

    InsertRecord=()=>{
        var Email = this.state.email;
        var Username = this.state.username;
        var Nomor = this.state.nomor;
        var Password = this.state.password;
        var ConfirmPw = this.state.confirmPw;

        if ((Email.length==0) || (Nomor.length==0) || (Password.length==0) || (ConfirmPw.length==0) || (Username.length==0)){
            alert("Silahkan masukkan data anda dengan benar !!!");
        }else{
            //cek email pada database
            setDoc(doc(firebase, "user", Username),{
                username : Username,
                email : Email,
                nomor : Nomor,
                password : Password
            })
            .then(() => {
                //jika login berhasil maka masuk halaman login
                console.log("data berhasil submit");
                Alert.alert("Data Berhasil Disimpan!");
                this.props.navigation.navigate("SignIn");
            })
            .catch((error) => {
                //jika mengambil data gagal, akan tampil error
                setError(error.message);
            })
        }
    }
    updateSecureTextEntry() {
        this.setState({
          ...this.state,
          secureTextEntry: !this.state.secureTextEntry,
        });
      }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.viewStyle}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                  source={require('../assets/logo.png')}
                  style={{width: 200, height: 140}}
                  />
                </View>
                <Text style={styles.title}>
                        Register
                    </Text>
                <FormControl w="100%" pt="5%" >
                <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="x1">Nama</Text>
                    </FormControl.Label> 
                    <Center>
                    <Input
                            w="95%" h="45"
                            borderRadius="10" borderWidth="1"
                            mb="5"
                            size="1x1"
                            p={2}
                            backgroundColor= "#ffff"
                            placeholderTextColor="black"
                            borderColor= '#2396f2'
                            underlineColorAndroid="transparent"
                            onChangeText={(username)=>this.setState({username})}
                            />
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="x1">Email</Text>
                    </FormControl.Label> 
                    <Center>
                    <Input
                            w="95%" h="45"
                            borderRadius="10" borderWidth="1"
                            mb="5"
                            size="1x1"
                            p={2}
                            backgroundColor= "#ffff"
                            placeholderTextColor="black"
                            borderColor= '#2396f2'
                            underlineColorAndroid="transparent"
                            onChangeText={(email)=>this.setState({email})}
                            />
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="x1">Nomor HP</Text>
                    </FormControl.Label> 
                    <Center>
                    <Input
                            w="95%" h="45"
                            borderRadius="10" borderWidth="1"
                            mb="5"
                            size="1x1"
                            p={2}
                            backgroundColor= "#ffff"
                            placeholderTextColor="black"
                            borderColor= '#2396f2'
                            underlineColorAndroid="transparent"
                            onChangeText={(nomor)=>this.setState({nomor})}
                            />
                    </Center>
                    <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Password</Text>
                    </FormControl.Label>
                    <Center>
                      <Input
                                w="95%" h="45"
                                borderRadius="10" borderWidth="1"
                                mb="5"
                                size="1x1"
                                p={2}
                                backgroundColor= "#ffff"
                                placeholderTextColor="black"
                                borderColor= '#2396f2'
                                underlineColorAndroid="transparent"
                                secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(password) => this.setState({ password })}
                                InputRightElement={
                                    <Pressable
                                    mr="2"
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
                            <FormControl.Label>
                        <Text fontFamily="heading" fontWeight="500" fontSize="xl">Ulangi Password</Text>
                    </FormControl.Label>
                    <Center>
                      <Input
                                w="95%" h="45"
                                borderRadius="10" borderWidth="1"
                                mb="5"
                                size="1x1"
                                p={2}
                                backgroundColor= "#ffff"
                                placeholderTextColor="black"
                                borderColor= '#2396f2'
                                underlineColorAndroid="transparent"
                                secureTextEntry={this.state.secureTextEntry ? true : false}
                                onChangeText={(password) => this.setState({ password })}
                                InputRightElement={
                                    <Pressable
                                    mr="2"
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
                
                <View style={styles.registerButtonSection}>
                    <Button title="Register" onPress={()=>{this.InsertRecord()}}/>
                </View>
                <Text 
                      style={styles.loginText}
                      onPress={() => {this.props.navigation.navigate("SignIn")}}>
                       Already Registered? Click here to login
                  </Text>
                  </FormControl>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
