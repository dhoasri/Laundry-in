import React, { Component } from 'react';
import { View, TextInput, Button, TouchableOpacity, SafeAreaView, Image, Text, Alert } from 'react-native';
import styles from './style';
import 'firebase/firestore';
import firebase from '../database/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { SceneView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeBaseProvider, VStack, Box, Pressable, Center,Flex, Input, FormControl, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Pesanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            alamat : '',
            nomor : '',
            catatan : '',
            check_textInputChange : false,
            secureTextEntry : true
        };
    }

    InsertRecord=()=>{
        var Nama = this.state.nama;
        var Alamat = this.state.alamat;
        var NomorHP = this.state.nomor;
        var Catatan = this.state.catatan;

        if ((Nama.length==0) || (Alamat.length==0) || (NomorHP.length==0)){
            alert("Silahkan masukkan data alamat anda dengan benar !!!");
        }else{
            //cek email pada database
            setDoc(doc(firebase, "Alamat", Alamat),{
                nama: Nama,
                alamat : Alamat,
                nomor : NomorHP,
                catatan : Catatan
            })
            .then(() => {
                //jika login berhasil maka masuk halaman login
                console.log("Password Berhasil DiUpdate");
        Alert.alert("Pemberitahuan","Lokasi anda telah tersimpan. Silahkan tunggu konfirmasi dari kami melalui WhatsApp.");
                this.props.navigation.navigate("Home");
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
                  <View style={styles.action3}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Nama"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={nama=>this.setState({nama})}
                        />   
                </View>
                <View style={styles.action3}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Alamat"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={alamat=>this.setState({alamat})}
                        />   
                </View>
                <View style={styles.action3}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Nomor HP"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={nomor=>this.setState({nomor})}
                        />   
                </View>
                <View style={styles.action3}>
                    <TextInput 
                        style={{flex:1, height: 45,width: "95%",borderWidth: 1,borderColor: '#2396f2',backgroundColor: "#ffff", borderRadius: 13, paddingLeft: 15}}
                        placeholder="Catatan"          
                        placeholderTextColor="black"
                        underlineColorAndroid="transparent"
                        onChangeText={catatan=>this.setState({catatan})}
                        />
                </View>

                <View style={styles.koor}>
                    <Button title="Pilih Titik Kordinat" onPress={()=>{this.props.navigation.navigate("Maps")}}/>
                </View>
                <View style={styles.registerButtonSection}>
                    <Button title="Simpan Data" onPress={()=>{this.InsertRecord()}}/>
                </View>
                

                </ScrollView>
                </SafeAreaView>
        );
    }
}