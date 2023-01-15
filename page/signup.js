import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity, SafeAreaView, Image, Text, Alert } from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc } from "firebase/firestore"; 

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
        var Password = this.state.password;
        var ConfirmPw = this.state.confirmPw;

        if ((Email.length==0) || (Password.length==0) || (ConfirmPw.length==0) || (Username.length==0)){
            alert("Required Field Is Missing!!!");
        }else{
            //cek email pada database
            setDoc(doc(firebase, "user", Username),{
                username : Username,
                email : Email,
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
                <View style={styles.viewStyle}>
                <Image style={styles.gambar2} source={require('../assets/logo.png')} />
                <Text style={styles.title}>
                        Register
                    </Text>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 10}}
                        placeholder="  Nama"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={username=>this.setState({username})}
                        />   
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 10}}
                        placeholder="  Email"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={email=>this.setState({email})}
                        />   
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 10}}
                        placeholder="  Password"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={password=>this.setState({password})}
                        
                        />
                </View>
                <View style={styles.action}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderColor: "black",borderWidth: 2,backgroundColor: "lightblue", borderRadius: 10}}
                        placeholder="  Ulangi Password"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        onChangeText={confirmPw=>this.setState({confirmPw})}
                        />
                </View>
                    
                </View>
                <View style={styles.registerButtonSection}>
                    <Button title="Register" onPress={()=>{this.InsertRecord()}}/>
                </View>
                
            </SafeAreaView>
        );
    }
}