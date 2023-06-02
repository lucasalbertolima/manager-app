import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { CheckBox } from 'react-native-elements';
import { StyleSheet, Modal, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import api from '../../../services/api';
import { View } from "react-native";
import * as FileSystem from 'expo-file-system';
//import { Buffer } from 'node:buffer';

export default () => {

  global.Buffer = require('buffer').Buffer;

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [brasil, setBrasil] = useState(true);
  const [exterior, setExterior] = useState(false);

  const [transferId, setTransferId] = useState();
  const [idCreatedBy, setIdCreatedBy] = useState('');
  const [nameCreatedBy, setNameIdCreatedBy] = useState('');
  const [idUser, setIdUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [depositRegion, setDepositRegion] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleCheck = () => {
    setBrasil(!brasil);
    setExterior(!exterior);
  };

  const [amount, setAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [typeImage, setTypeImage] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const result = await api.getUser();
    if (result && result.name) {
      setName(result.name);
    } else {
      alert(result.error);
    }
  }

  const cleanValue = (value) => {
    if (!value || value === '') {
      return 0;
    }

    const cleanAmount = value.replace(/[^0-9]/g, '');
    return Number(cleanAmount) / 100;
  };

  const requestNewDeposit = async () => {
    if (amount) {
      const region = brasil ? 'Brasil' : 'Exterior';
      const cleanAmount = cleanValue(amount);
      const data = {
        amount: cleanAmount,
        isTransfer: 1,
        region: region
      };
      let result = await api.requestNewDeposit(data);
      if (result.error) {
        alert(result.error);
      } else {
        setTransferId(result.id);
        setIdCreatedBy(result.created_by.id);
        setIdUser(result.user_id);
        setNameUser(result.user_id);
        setCreatedAt(result.created_at);
        setNameIdCreatedBy(result.user.name);
        setDepositRegion(result.deposit_region.name)
        showModal();
      }
    } else {
      alert("Preencha os campos corretamente");
    }
  }

  const showModal = () => {
    setModalVisible(!modalVisible);
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({

      base64: true,
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      setSelectedImage(result?.assets[0]?.base64);
      setImageUri(result?.assets[0].uri);
      setTypeImage(result?.assets[0].type);
      console.log(result?.assets[0].uri)
      console.log(result?.assets[0].type)
    } else {
      alert('Você não selecionou nenhuma imagem');
    }
  };


  const requestNewDepositImage = async () => {
    if (selectedImage && transferId) {
      const byteCharacters = Buffer.from(selectedImage, 'base64');
      const byteArray = new Uint8Array(byteCharacters);
      console.log(byteCharacters)
    
      let result = await api.requestNewDepositImage(transferId, byteArray);
      if (result.errors) {
        alert(result.errors);
      } else {
        alert('Envio do comprovante concluído com sucesso.');
      }
    } else {
      alert('Por favor, selecione uma imagem.');
    }
  };
  
  return (
    <C.Container>
      <C.SubContainer>
        <C.TitleSubContainer>Dados do usuário:</C.TitleSubContainer>
        <C.SubTitleSubContainer>Depósito em nome de:{'\n'}{name}</C.SubTitleSubContainer>
        <C.SubTitleSubContainer>Solicitado por:{'\n'}{name}</C.SubTitleSubContainer>
        <C.BankAccountImage source={require('../../../assets/opcoes_pagamento_tablet.png')} />
        <C.TitleSubContainer>{'\n'}Solicitar saque do:</C.TitleSubContainer>
        <View style={{
          backgroundColor: '#EBECF0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 15
        }}>
          <CheckBox
            containerStyle={{ backgroundColor: '#EBECF0' }}
            title='Brasil'
            checked={brasil}
            onPress={handleCheck}
          />
          <CheckBox
            containerStyle={{ backgroundColor: '#EBECF0' }}
            title='Exterior'
            checked={exterior}
            onPress={handleCheck}
          />
        </View>
        <C.TextInputContainer
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: '',
          }}
          placeholder="Insira o valor em R$ aqui"
          value={amount}
          onChangeText={(t) => {
            setAmount(t);
          }}
        />
        <C.ButtonArea onPress={requestNewDeposit}>
          <C.ButtonText>Solicitar Depósito</C.ButtonText>
        </C.ButtonArea>
      </C.SubContainer>

      <Modal
        visible={modalVisible}
        animationType="slide"
        style={styles.modalContainer}
      >
        {transferId && (
          <View style={styles.viewModalContainer}>
            <C.TitleSubContainer style={{ textAlign: 'center' }} >
              Informações do Depósito - {transferId}
            </C.TitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Id da Transação: {transferId}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Id do Solicitante: {idCreatedBy}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Id do Usuário: {idUser}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Data e hora da Solicitação: {createdAt}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Solicitado por: {nameCreatedBy}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Nome do Usuário: {nameUser}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Destino: {depositRegion}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Status:
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Comprovante:
            </C.SubTitleSubContainer>

            <C.ButtonArea style={{ backgroundColor: "#008000" }} onPress={pickImageAsync}>
              <C.ButtonText>SELECIONAR COMPROVANTE</C.ButtonText>
            </C.ButtonArea>

            {selectedImage && (
              <View style={{ marginTop: 20 }}>
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            )}

            <C.ButtonArea style={{ backgroundColor: "#008000" }} onPress={requestNewDepositImage}>
              <C.ButtonText>ENVIAR COMPROVANTE</C.ButtonText>
            </C.ButtonArea>
          </View>
        )}
      </Modal>
    </C.Container>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
  viewModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
  },
});
