import React, { Component } from 'react';
import { View, TextInput, Pressable, Text, SafeAreaView, Image, Alert, ScrollView} from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { getDocs, query, collection, where} from "firebase/firestore"; 
import Feather from "react-native-vector-icons/Feather";

export default class sigin extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username : "",
          password : "",
          dbusername: "",
          dbpassword: "",
          check_textInputChange : false,
      };
  }

  readData = () => {
      var Username = this.state.username;
      var Password = this.state.password;
      if (Username.length == 0 || Password.length == 0) {
        alert("Harap Isi Form!");
      } else if (this.state.username === "Guest" && this.state.password === "Guest") {
        Alert.alert("Selamat Datang");
        this.props.navigation.navigate("BottomNavigator");
      } else {
        getDocs(
          query(collection(firebase, "user"), where("username", "==", Username))
        ).then((docSnap) => {
          let users = [];
          docSnap.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          this.setState({
            dbpassword: users[0].password,
            dbusername: users[0].username
          });
          this.validasi();
        });
      }
  };
  
  validasi = () => {
      console.log(this.state.username);
      console.log(this.state.password);
  
      if (this.state.username === "Guest" && this.state.password === "Guest") {
        Alert.alert("Selamat Datang");
        this.props.navigation.navigate("BottomNavigator");
      } else {
        if (
          this.state.username === this.state.dbusername &&
          this.state.password === this.state.dbpassword
        ) {
          Alert.alert("Selamat Datang");
          console.log("Login Berhasil");
          this.props.navigation.navigate("BottomNavigator");
        } else {
          Alert.alert("Login Gagal");
        }
      }
  };


    validasiDB = () => {};

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
                  style={{width: 300, height: 210,marginTop: 100 ,marginBottom: 30}}
                  />
                </View>
                <Text style={styles.title}>
                        Login
                    </Text>
                    <View style={styles.action}>
                        <TextInput 
                            style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2' ,backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                            placeholder="Masukkan Nama / email"          
                            placeholderTextColor="black"
                            underlineColorAndroid="transparent"
                            secureTextEntry={false}
                            onChangeText={(username)=>this.setState({username})}
                            />   
                    </View>
                
                    <View style={styles.action}>
                        <TextInput 
                            style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                            placeholder="Masukkan Password"          
                            placeholderTextColor="black"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            InputRightElement={
                              <Pressable
                              mr="3"
                              onPress={this.updateSecureTextEntry.bind(this)}
                              >
                              {this.state.secureTextEntry ? (
                                  <Feather name="eye-off" color="black" size={20} />
                              ) : (
                                  <Feather name="eye" color="black" size={20} />
                              )}
                              </Pressable>
                          }
                            />
                            
                    </View>
                        {/* Button */}
                    <View style={styles.loginButtonSection}>
                        <Pressable
                            style={styles.loginButton}onPress={()=>{this.readData() }}>
                            <Text style={styles.text}>Login</Text>
                        </Pressable>
                    </View>
                    <Text 
                      style={styles.loginText}
                      onPress={() => {this.props.navigation.navigate("SignUp")}}>
                      Don't have an account? Register here
                  </Text>
                </ScrollView>
            
            </SafeAreaView>
        );
    }
}
