import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { async } from '@firebase/util';



const ChatScreen = () => {
    
    const { user, logOut } = useAuth();
    console.log(user);
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
        }
    };
  return (
    <View>
      <TouchableOpacity
                onPress={handleLogOut}
                style={styles.button}>

                <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>LogOut</Text>
            </TouchableOpacity>
    </View>
  )
}

export default ChatScreen

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
        marginTop:200, marginBottom:15, marginLeft: 100,
        height:50,
        width:180,
        backgroundColor:'#4C3575',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})