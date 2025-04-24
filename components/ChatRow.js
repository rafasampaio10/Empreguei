import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "tailwind-react-native-classnames"
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");


  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
      collection(db, "matches", matchDetails.id, "messages"),
      orderBy("timestamp","desc"), 
      limit(1)), 
      (snapShot) => setLastMessage(snapShot.docs[0]?.data()?.message))
  }, [matchDetails]);

  return (
    <TouchableOpacity style={tw.style("flex-row items-center p-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg")}
    onPress={()=> navigation.navigate("Message",{matchDetails})}
    >
      <Image 
      style={tw.style("rounded-full h-16 w-16 mr-4")}
      source={{uri:matchedUserInfo?.photoURL}}
      />
      <View>
        <Text style={tw.style("text-lg font-semibold")}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Diga Olá"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;