import { View, Text, TouchableOpacity, Image, backgroundColor } from 'react-native';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../../hooks/useAuth';
import {Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import Swiper from "react-native-deck-swiper";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db, timestamp } from '../../../firebase';
import geradorId from "../../../lib/geradorId";
import AsyncStorage from '@react-native-async-storage/async-storage';

//const DUMMY_DATA = [
//  {
    //displayName: "Rafael Sampaio",
    //job: "Analista Funcional",
    //photoURL:
    //  "https://scontent.fcgh10-1.fna.fbcdn.net/v/t39.30808-6/348440070_951497839307679_8475200680373518716_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=49d041&_nc_ohc=PqzuCfZBCyYAX8zk-pC&_nc_ht=scontent.fcgh10-1.fna&oh=00_AfDemynICzIxEiZ19xHZhmcBuUMHYi0PJXvAtnKCtqHTLA&oe=6523D05D",
    //age: 21,
    //id: 1,
    //profile: "Candidato(a)",
  //},
//{
    //displayName: "Victoria Machado",
    //job: "Auxiliar de Exames",
    //photoURL:
    //  "https://scontent.fcgh10-1.fna.fbcdn.net/v/t39.30808-6/359807822_6273001436154037_3949566370841232484_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=49d041&_nc_ohc=5YWw7LeWUkEAX9_9f0w&_nc_oc=AQnppj16HeLOQi_-33qvFrrUyZzifTdM8kDD6Jm1KXz-7g1IGpxHU0221vwD8PgrkORqaBepEekQxFbr8k81h1lo&_nc_ht=scontent.fcgh10-1.fna&oh=00_AfBK4KyAc6BrTPcwIpcw89qK8DOVSRMwuN_Fl9psYmYuhA&oe=6523C448",
    //age: 22,
    //id: 2,
    //profile: "Candidato(a)",
  //},
//{
    //displayName: "Mercado Eletrônico",
    //job: "Emprego Analista de Requisistos",
    //photoURL:
    //  "https://scontent.fcgh10-1.fna.fbcdn.net/v/t39.30808-6/305640328_757054205646229_7825533257674497778_n.png?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=mpNm3_Q8OWUAX-PfTcE&_nc_ht=scontent.fcgh10-1.fna&oh=00_AfDM_SvCQVyGSEuDfSPad0wZe6kI6xnn_749SWZQQVaknA&oe=65250055",
    //vagas: 1,
    //id: 3,
    //profile: "Recrutador(a)",
  //},
//];

const HomeScreen = () => {

  const {user, logout} = useAuth();

  const [profiles, setProfiles] = useState([]);

  const navigation = useNavigation();

  const swipeRef = useRef();

  useLayoutEffect(()  =>  {
    getDoc(doc(db,"users",user.uid)).then((data)=>{
      if(!data.exists()){
        navigation.navigate("Modal");
      }
    })
  },[])

  useEffect(() => {
    let unsubscribe;

   const fetchCards = async () => {

    const recusados = await getDocs(
      collection(db,"users", user.uid, "recusados")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

    const aceitos = await getDocs(
        collection(db,"users", user.uid, "aceitos")
        ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

        const recusadosUserIds = recusados.length > 0 ? recusados : ["temp"];
        const aceitosUserIds = aceitos.length > 0 ? aceitos : ["temp"];
        
        unsubscribe = onSnapshot(
          query(
            collection(db,"users"),
            where("id","not-in", [...recusadosUserIds, ...aceitosUserIds])
          ),
          (snapShot)=>{
         setProfiles(
            snapShot.docs
              .filter((doc) => doc.id !== user.uid)
             .map((doc) => ({
                id:doc.id,
               ...doc.data(),
            }))
          );
        });
    };

    fetchCards();

    return unsubscribe;
  }, []);

  
  const swipeLeft = (cardIndex) => {
    if(!profiles[cardIndex]){
      return;
    }

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db,"users",user.uid,"recusados",userSwiped.id),userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if(!profiles[cardIndex]){
      return;
    }

    const userAceito = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userAceito.id, "aceito", user.uid)).then((docSnap) => {
      if(docSnap.exists()){
        setDoc(
          doc(db, "users", user.uid, "aceito", userAceito.id),
          userAceito
        );
        setDoc(doc(db, "matches", geradorId(user.uid, userAceito.id)), {
          users:{
            [user.uid]:loggedInProfile,
            [userAceito.id]:userAceito,
          },
          usersMatched:[user.uid, userAceito.id],
          timestamp,
        });

        navigation.navigate("Match", {
          loggedInProfile,
          userAceito,
        })
      }
      else{
        setDoc(
          doc(db, "users", user.uid, "aceito", userAceito.id),
          userAceito
        );
      }
    })
  };

  return (
    <SafeAreaView style={tw.style("flex-1 mt-0.5")}>
      <View style={tw.style("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw.style("h-10 w-10 rounded-full")}
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
          style={tw.style("h-14 w-14")}
          source={require("../../assets/Logo1.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <FontAwesome name="wechat" size={32} color="#f39c12" />
        </TouchableOpacity>

      </View>

      <View style={tw.style("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            console.log("Deslize sem Match");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Deslize Match");
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title:"NOPE",
              style:  {
                label:  {
                  textAlign:"right",
                  color:"red"
                },
              },
            },
            right:  {
              title:"LIKE",
              style:  {
                label:  {
                  color:"#4DED30",
                },
              },
            },
          }}
          renderCard={(card)  =>  {
            return card ? (
              <View 
                key={card.id} 
                style={tw.style("bg-white h-3/4 rounded-xl relative")}
              >
                <Image 
                  style={tw.style("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />

                <View 
                style={tw.style(
                  "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex flex-row px-6 py-2 rounded-b-xl shadow-xl"
                  )}
                >
                  <View>
                    <Text style={tw.style("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text style={tw.style("text-sm font-semibold mt-1")}>{card.job}</Text>
                   
                  </View>
                    <Text style={tw.style("text-2xl font-bold")}>{card.age}</Text>
                    <Text style={tw.style("text-2xl font-bold")}>{card.vagas}</Text>
                </View>

              </View>
            ) : (
              <View style={tw.style("relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
              )}
              >
                <Text style={tw.style("font-bold pb-5")}>Não existem mais perfis.</Text>
                <Image 
                style={tw.style("h-20 w-20")}
                source={{
                  uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                }}
                />
              </View>
            )
          }}
        />
      </View>

      <View style={tw.style("flex flex-row justify-evenly")}>
          <TouchableOpacity 
            onPress={() => swipeRef.current.swipeLeft()}
            style={
              tw.style("items-center justify-center rounded-full w-16 h-16 bg-red-200"
              )}>
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={
              tw.style("items-center justify-center rounded-full w-16 h-16 bg-green-200"
              )}>
              <Entypo name="heart" size={24} color="green" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;