import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core'
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db } from "../config";
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [bio, setBio] = useState(null);
    const [location, setLocation] = useState(null);

    const incompleteForm = !image || !name || !age || !bio || !location;

    const createUser = async () => {
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name: name,
        image: image,
        age: age,
        bio: bio,
        location: location,
        timestamp: serverTimestamp()
      }).then(() => {
        navigation.navigate("Home")
      }).catch((error) => {
        alert(error.message);
      });
    };

    
  return (
    <SafeAreaView style={{ flex: 1}}>

    <View style={{ flex: 1, alignItems:"center", paddingTop:1}}>
      <Text style={{ height:50, marginTop:50, fontSize:30}}>
        IMAGE -LOGO-
      </Text>

      <Text style={{fontSize:15, fontWeight:"bold", paddingTop:2}}>
        Welcome Orbiters
      </Text>

      <Text style={{ padding: 30, fontWeight:"bold", color:'purple' }}>
        Step 1: Profile Pic
      </Text>
      <TextInput
      value={image}
      onChangeText={text => setImage(text)}
      placeholder='Enter a Pic URL'/>
      <Text style={{ padding: 30, fontWeight:"bold", color:'purple' }}>
        Step 2: Your Name
      </Text>
      <TextInput
      value={name}
      onChangeText={text => setName(text)}
      placeholder='Enter your name'/>
      <Text style={{ padding: 30, fontWeight:"bold", color:'purple' }}>
        Step 3: Your Age
      </Text>
      <TextInput
      value={age}
      onChangeText={text => setAge(text)} 
      placeholder='Enter your age'
      keyboardType='numeric'
      maxLength={2}/>
      <Text style={{ padding: 30, fontWeight:"bold", color:'purple' }}>
        Step 4: Your Bio
      </Text>
      <TextInput
      value={bio}
      onChangeText={text => setBio(text)} 
      placeholder='Enter your bio'/>
      <Text style={{ padding: 30, fontWeight:"bold", color:'purple' }}>
        Step 5: Your Location
      </Text>
      <TextInput 
      value={location}
      onChangeText={text => setLocation(text)}
      placeholder='Enter your location'/>

      <TouchableOpacity
      disabled={incompleteForm} 
      style={[styles.button, incompleteForm ? styles.buttonOff : styles.button,]}
      onPress={createUser}>
        <Text style={{color:"white"}}>Update Profile</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default ModalScreen

const styles = StyleSheet.create({
    button:{
        marginTop:10,
        height:60,
        width:250,
        backgroundColor:'#4C3575',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    },
    buttonOff:{
        marginTop:10,
        height:60,
        width:250,
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})