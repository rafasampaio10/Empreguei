import { View, Text } from 'react-native';
import React from 'react';
import Header from "../../../components/Header";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatList from '../../../components/ChatList';

const ChatScreen = () => {
  return (
    <SafeAreaView style={tw.style("pt-5")}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;