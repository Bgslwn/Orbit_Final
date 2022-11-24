import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
import {useNavigation, useRoute} from "@react-navigation/core";
import { SafeAreaView } from 'react-native-safe-area-context';

const MatchedScreen = () => {
    const navigation = useNavigation();
    const {params } = useRoute();
    const {loggedInProfile,userSwiped} = params;

  return (
    <SafeAreaView>
    <View style={{backgroundColor:"purple", opacity:0.89, height:"100%"}} >
      <View style={{flex:0.50, alignItems:"center", justifyContent:"center"}}>
      <Text style = {{color:"white", justifyContent:"center", marginTop:100, fontSize:25}}>
        You and {userSwiped.name} 
      </Text>
      <Text style = {{color:"white", justifyContent:"center", marginTop:20, fontSize:25}}>
        have liked each other.
      </Text>
      </View>
      <View>
      <Image 
              style={{height:150, width:"100%"}}
              height={100}
              width={100}
              source={{ uri: "https://images.emojiterra.com/google/android-oreo/512px/1f64f.png"}}    
              />
      </View>

      <TouchableOpacity 
        style = {styles.button}
        onPress={() => {
            navigation.goBack();
            navigation.navigate("Chat");
        }}
      >
        <Text style={{alignItems:"center", fontWeight:"bold"}}>See Your Match List!</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

export default MatchedScreen

const styles = StyleSheet.create({
    button:{
        marginBottom:15, marginLeft: 90,
        height:50,
        width:180,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})