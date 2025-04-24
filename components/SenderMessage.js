import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';

const SenderMessage = ({message}) => {
  return (
    <View style={tw.style("rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2",
    { backgroundColor: "#f39c12", alignSelf: "flex-start", marginLeft: "auto"}
    )}
    >
      <Text style={tw.style("text-white")}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;