import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const Navbar = () => {

    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
      onPress={navigation.navigate("Profile")}
      >
        <Text> PROFILE </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={navigation.navigate("Home")}
      >
        <Text> HOME </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={navigation.navigate("Chat")}
      >
        <Text> CHAT </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Navbar