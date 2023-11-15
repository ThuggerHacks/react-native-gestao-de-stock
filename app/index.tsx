import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function index() {
    const { navigate, goBack }:any = useNavigation();

  setTimeout(() => {
    navigate("home");
  },1000)
  return (
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <Text style={{color:"#fff",fontSize:20}}>Carregando...</Text>
    </View>
  )
}
