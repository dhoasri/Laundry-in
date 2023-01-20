import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity, SafeAreaView, Image, Text, Alert } from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { SceneView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email : '',
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
                this.props.navigation.navigate("SignInScreen");
            })
            .catch((error) => {
                //jika mengambil data gagal, akan tampil error
                setError(error.message);
            })
        }
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
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Nama"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={username=>this.setState({username})}
                        />   
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Email"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={email=>this.setState({email})}
                        />   
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Nomor HP"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={nomor=>this.setState({nomor})}
                        />   
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Password"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={password=>this.setState({password})}
                        />
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15, marginBottom: 15}}
                        placeholder="Ulangi Password"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={confirmPw=>this.setState({confirmPw})}
                        />
                </View>
                    
                </ScrollView>
                <View style={styles.registerButtonSection}>
                    <Button title="Register" onPress={()=>{this.InsertRecord()}}/>
                </View>
                
            </SafeAreaView>
        );
    }
}
