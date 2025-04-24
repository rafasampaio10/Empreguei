import { View, Text, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Foundation, Ionicons } from '@expo/vector-icons';

const Header = ({title, callEnable}) => {
    const navigation = useNavigation();

    return (
        <View style={tw.style("p-0.5 flex-row items-center justify-between")}>
            <View style={tw.style("flex flex-row items-center")}>
                <TouchableOpacity style={tw.style("p-1")}
                onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-outline" size={34} color="#f39c12" />
                </TouchableOpacity>
                <Text style={tw.style("text-2xl font-bold pl-0.5")}>{title}</Text>
            </View>
            {callEnable && (
                <TouchableOpacity style={tw.style("rounded-full mr-4 p-3 bg-red-200")}>
                    <Foundation name ="telephone" size={20} color="orange" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;