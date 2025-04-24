import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import useAuth from '../../../hooks/useAuth';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, setDoc } from 'firebase/firestore';
import { db, timestamp } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
  const {user} = useAuth();

  const navigation = useNavigation()

  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [vagas, setVagas] = useState('');
  const [profile, setProfile] = useState('');

  const incompleteForm = profile === '1' 
  ? !image || !age || !job 
  : !image || !job || !vagas;

  const updateUserProfile = ()=>{
    setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      profile,
      displayName:user.displayName,
      photoURL:image,
      job,
      age,
      vagas,
    }).then(()=>{
      navigation.navigate("Home")
    }).catch((err)=>{
      Alert.alert("Erro", err.message);
    })
  }

  const data = [
    { label: 'Candidato', value: '1' },
    { label: 'Recrutador', value: '2' },
  ];

  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (profile || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'orange' }]}>
          Selecione uma Opção
        </Text>
      );
    }
    return null;
  };

  const clearProfile = () => {
    if (profile === '1') {
      setJob('');
      setVagas('');
    } else if (profile === '2') {
      setAge('');
    }
  };


  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Image 
        style={tw.style("h-20 w-full")}
        resizeMode="contain"
        source={require("../../assets/text-logo.png")}
      />
      <Text style={{ fontSize: 20, color: '#F39C12', padding: 8, fontWeight: 'bold' }}>
        Bem Vindo(a), {user.displayName}
      </Text>

      <Text style={tw.style("text-center p-1 font-bold text-black")}>Passo 1:</Text>
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'orange' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Selecione uma Opção' : '...'}
          searchPlaceholder="Pesquisar..."
          value={profile}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false);
            clearProfile();
          }}
          onChange={item => {
            setProfile(item.value);
            setIsFocus(false);
            clearProfile();
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'orange' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>

      <Text style={tw.style("text-center p-1 font-bold text-black")}>
        Passo 2: {profile === '1' ? 'Vaga' : 'Vaga Oferecida'}
      </Text>
      <TextInput placeholder={`Insira a ${profile === '1' ? 'vaga desejada' : 'vaga oferecida'}`}
      style={tw.style("text-center text-xl pb-2")}
      value={job}
      onChangeText={setJob}
      />

      <Text style={tw.style("text-center p-4 font-bold text-black")}>
        Passo 3: {profile === '1' ? 'Idade' : 'Quantidade de Vagas'}
      </Text>
      <TextInput placeholder={`Insira ${profile === '1' ? 'Sua Idade' : 'Quantidade de vagas'}`}
      style={tw.style("text-center text-xl pb-2")}
      keyboardType="numeric"
      value={profile === '1' ? age : vagas}
      onChangeText={profile === '1' ? setAge : setVagas}
      maxLength={profile === '1' ? 2 : 5}
      />

      <Text style={tw.style("text-center p-4 font-bold text-black")}>
        Passo 4: Foto
      </Text>

      <TextInput placeholder='Insira a URL da sua Foto de Perfil' 
      style={tw.style("text-center text-xl pb-2")}
      keyboardType="url"
      value={image}
      onChangeText={setImage}
      />
  
      <TouchableOpacity
      disabled={incompleteForm}
      style={{
        width: 220,
        padding: 15,
        marginTop: 20,
        borderRadius: 15,
        bottom: 10,
        backgroundColor: incompleteForm ? 'gray' : 'orange',
        alignItems: 'center',
      }}
      onPress={updateUserProfile}
      >
        <Text style={tw.style("text-center text-white text-xl")}>Cadastrar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  dropdown: {
    height: 50,
    width: 250,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 6,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});