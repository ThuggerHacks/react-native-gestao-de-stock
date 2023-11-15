import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [canProceed, setCanProceed]:any = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
    setTimeout(() => {
      handleAuthentication();
    },3000)
  }, []);

  const checkBiometricAvailability = async () => {
    const result = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(result);
  };

  const handleAuthentication = async () => {
    if (isBiometricAvailable) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        console.log('Authentication successful');
        setCanProceed(true)
        // Add your logic here for a successful authentication
      } else {
        console.log('Authentication failed');
        // Add your logic here for a failed authentication
        alert("A autenticacao falhou")
      }
    } else {
      console.log('Biometric authentication not available');
     // alert("Por favor active a autenticacao por impressao digital")
      // Add your logic here for when biometric authentication is not available
    }
  };

  return canProceed ? (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName='(tabs)'>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index"  options={{ headerShown: false }}/>
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </ThemeProvider>
  ):(
    <View style={{justifyContent:"center",alignItems:"center",flex:1,backgroundColor:"#222"}}>
      <TouchableOpacity style={styles.btn} onPress={handleAuthentication}>
        <Text style={styles.btnText}>Entrar Na Plataforma</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  btn:{
    backgroundColor:"purple",
    padding:20,
    marginTop:10,
    borderRadius:10
},
btnText:{
    fontSize:17,
    textAlign:"center",
    color:"#fff"
}
})