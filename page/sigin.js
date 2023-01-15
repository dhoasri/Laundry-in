import React, { Component } from 'react';
import { View, TextInput, Pressable, Text, SafeAreaView, Image, Alert} from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { getDocs, query, collection, where} from "firebase/firestore"; 

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
          this.props.navigation.navigate("HomeScreen");
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
              dbusername: users[0].username,
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
          this.props.navigation.navigate("HomeScreen");
        } else {
          if (
            this.state.username === this.state.dbusername &&
            this.state.password === this.state.dbpassword
          ) {
            Alert.alert("Selamat Datang");
            console.log("Login Berhasil");
            this.props.navigation.navigate("HomeScreen");
          } else {
            Alert.alert("Login Gagal");
          }
        }
    };

    validasiDB = () => {};
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.viewStyle}>
                <Image style={styles.gambar2} source={require('../assets/logo.png')} />
                <Text style={styles.title}>
                        Login
                    </Text>
                    <View style={styles.action}>
                        <TextInput 
                            style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 15}}
                            placeholder="   Username"          
                            placeholderTextColor="black"
                            underlineColorAndroid="transparent"
                            secureTextEntry={false}
                            onChangeText={username=>this.setState({username})}
                            />   
                    </View>
                
                    <View style={styles.action}>
                        <TextInput 
                            style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 15}}
                            placeholder="   Password"          
                            placeholderTextColor="black"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={password=>this.setState({password})}
                            />
                            
                    </View>
                        {/* Button */}
                    <View style={styles.loginButtonSection}>
                        <Pressable
                            style={styles.loginButton}onPress={()=>{this.readData() }}>
                            <Text style={styles.text}>Login</Text>
                        </Pressable>
                    </View>
                    <Text style={{marginTop: 20, textAlign: "center", color: 'black', fontSize: 12}}>
                    Belum punya akun? Daftar di bawah ini
                    </Text>
                    <View style={styles.loginButtonSection}>
                        <Pressable
                            style={styles.loginButton}
                            onPress={()=>{this.props.navigation.navigate("SignUpScreen")}}>
                            <Text style={styles.text}>Register</Text>
                        </Pressable>
                    </View>
                    <Text style={{marginTop: 0, textAlign: "center", color: 'white', fontSize: 20}}>
                    </Text>
                </View>
            
            </SafeAreaView>
        );
    }
}