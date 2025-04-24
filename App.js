import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import {AuthProvider} from "./hooks/useAuth";

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      
    </NavigationContainer>
  );
}