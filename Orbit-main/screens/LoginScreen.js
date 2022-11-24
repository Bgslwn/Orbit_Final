import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { logIn } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
        } catch (err) {
            setError(err.message);
        }
    } 

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                LOGIN
            </Text>

            <View style={{marginTop:10}}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}>

                <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
                    Dont an account already?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{
                    marginTop:7,fontSize:18, height:25,
                    textAlign:'center', color:'#4C3575',fontWeight:'bold'}}>
                    REGISTER
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    title: {
        fontWeight: 'bold', fontSize:40, textAlign:'center', marginTop:50, marginBottom:20,
    },

    input: {
        marginTop:10, marginBottom:10, width:220,
        paddingBottom:5, fontSize:13, height:20,
        borderBottomWidth:1, borderBottomColor:'#000',
        justifyContent:'center', textAlign:'left',
    },

    text: {
        marginTop:7,fontSize:14.5, height:25,
        textAlign:'center',
    },

    button:{
        marginTop:20, marginBottom:15, 
        height:50,
        width:180,
        backgroundColor:'#4C3575',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})