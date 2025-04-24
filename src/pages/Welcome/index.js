import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            
            <View style={styles.containerLogo}>
                <Animatable.Image
                    delay={200}
                    animation='flipInY'
                    source={require('../../assets/logo.png')}
                    style={{ width: '100%'}}
                    resizeMode="contain"
                />
            </View>
            
            <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
                <Text style={styles.title}>Encontre a Carreira dos seus Sonhos, a apenas um Clique de Distância!</Text>
                <Text style={styles.text}>Faça o login para iniciar</Text>

                <TouchableOpacity
                style={styles.button}
                onPress={ () => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Iniciar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
   container:{
        flex:1,
        backgroundColor: '#f39c12'
    },
    containerLogo:{
            flex: 2,
            backgroundColor:'#f39c12',
            justifyContent:"center",
            alignItems:"center"
        },
        containerForm:{
            flex: 1,
            backgroundColor: '#FFF',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: '7%',
            paddingEnd: '7%'
        },
        title:{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 15,
            marginBottom: 10,
        },        
        text:{
            color: '#a1a1a1'
        },
        button:{
            position: 'absolute',
            backgroundColor: '#f39c12',
            borderRadius: 50,
            paddingVertical: 15,
            width: '80%',
            alignSelf: 'center',
            bottom: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2%'
        },
        buttonText:{
            fontSize: 18,
            color: '#FFF',
            fontWeight: 'bold',
        }
}
)