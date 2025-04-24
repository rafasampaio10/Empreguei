import { 
  View,
  Text, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from "tailwind-react-native-classnames";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import {auth} from "../../../firebase"
import useAuth from '../../../hooks/useAuth';


const LoginScreen = () => {
  const [type, setType] = useState(1); //1.Login e 2.Cadastro

  const {loading,setLoading} = useAuth()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("") ;

  useEffect(()=>{
    setName("");
    setEmail("");
    setPassword("");
  },[type])

  const signIn = () => {
    if (email.trim() === "" || password.trim() === "")  {
      return Alert.alert("Ah, não!" , "Você não inseriu todas as informações");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth,email,password)
    .then(({user}) =>  {
      setLoading(false);
    })
    .catch((err)=>{
      setLoading(false);
    })
  };

  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "")  {
      return Alert.alert("Ah, não!" , "Você não inseriu todas as informações");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth,email,password).then(({user})=>{
      updateProfile(user, { displayName:  name  });
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    })
  };

  if(loading){
    return(
      <View style={tw.style("flex-1 justify-center items-center")} >
        <Text style={tw.style("font-semibold text-2xl")}>
          Carregando...
        </Text>
      </View>
    )
  }

  return (
    <ImageBackground 
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../../assets/bg.jpg")}
    >
      {type === 1 ? (
          <View style={tw.style("flex-1 justify-center items-center")}>
            <Text style={tw.style("text-2xl font-black")}>Empreguei</Text>
            <Text style={tw.style("text-white font-semibold text-sm")}>Acesse sua Conta</Text>
            <View style={tw.style("w-full p-5")}>
              <Text style={tw.style("font-semibold pb-2 text-white")}>E-mail</Text>
                <TextInput 
                keyboardType="email-address"
                style={
                tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")
                }
                value={email}
                onChangeText={(text) => setEmail(text)}
                />

                <Text style={tw.style("font-semibold pb-2 text-white")}>Senha</Text>
                <TextInput
                style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")
                }
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                  />
                <TouchableOpacity 
                  style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
                  onPress={signIn}
                >
                  <Text style={tw.style("text-center text-white font-bold text-xl")}>Acessar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType(2)}>
                  <Text style={tw.style("text-center text-gray-100 pt-3")}>Não Possui uma Conta ?</Text>
                </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={tw.style("flex-1 justify-center items-center")}>
            <Text style={tw.style("text-2xl font-black")}>Empreguei</Text>
            <Text style={tw.style("text-white font-semibold text-sm")}>Crie uma Nova Conta</Text>
            <View style={tw.style("w-full p-5")}>
              <Text style={tw.style("font-semibold pb-2 text-white")}>Nome</Text>
                <TextInput 
                  style={
                    tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
              <Text style={tw.style("font-semibold pb-2 text-white")}>E-mail</Text>
              <TextInput 
              keyboardType="email-address"
                  style={
                    tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")
                    }
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    secureTextEntry={false}
                />
              <Text style={tw.style("font-semibold pb-2 text-white")}>Senha</Text>
              <TextInput 
              secureTextEntry={true}
                  style={
                    tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")
                    }
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

              <TouchableOpacity 
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signUp}
              >
                <Text style={tw.style("text-center text-white font-bold text-xl")}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setType(1)}>
                <Text style={tw.style("text-center text-gray-100 pt-3")}>Já Possui uma Conta ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </ImageBackground>
  );
};

export default LoginScreen;