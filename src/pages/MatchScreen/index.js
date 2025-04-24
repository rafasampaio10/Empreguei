import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from "tailwind-react-native-classnames"
import { TouchableOpacity } from 'react-native-gesture-handler';

const MatchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {loggedInProfile, userAceito} = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#F39C12', paddingTop: 50, opacity: 0.89 }}>
      <View style={tw.style("justify-center px-10 pt-20")}>
        <Image 
        source={{
          uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png"
        }}
        style={tw.style("h-20 w-full")}
        />
        <Text style={tw.style("text-white text-center mt-5 text-xl")}>
          Você e {userAceito.displayName} se curtiram!
        </Text>

        <View style={tw.style("flex-row justify-evenly mt-5")}>
          <Image
          style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: loggedInProfile.photoURL,
            }}
          />
          <Image
          style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: userAceito.photoURL,
            }}
            />
        </View>
      </View>
      <TouchableOpacity style={tw.style("bg-white m-5 px-10 py-7 rounded-full mt-20")}
      onPress={() =>{
        navigation.goBack();
        navigation.navigate("Chat");
      }}
      >
        <Text style={{ fontSize: 20, color: '#F39C12', textAlign: 'center',}}>Mande sua Mensagem</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MatchScreen;