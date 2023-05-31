import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'

import { CheckBox } from 'react-native-elements';
import { StyleSheet, Modal, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 
import { View } from "react-native";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const [modalVisible, setModalVisible] = useState(false);

    const [name, setName] = useState("");
    const [brasil, setBrasil] = useState(true);
    const [exterior, setExterior] = useState(false);

    const [idDeposito, setIdDeposito] = useState();
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

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setName(result.name);
        }else{
            alert(result.error);
        }
    }

    const cleanValue = (value) => {
        // Verifica se a variável value é uma string vazia ou não está definida
        if (!value || value === '') {
          return 0; // Retorna zero como valor padrão
        }
      
        // Remove os caracteres da máscara, como separadores de milhares, separadores decimais e unidades
        const cleanAmount = value.replace(/[^0-9]/g, '');
      
        // Converte o valor para número
        return Number(cleanAmount)/100;
      };

    const requestNewDeposit = async () => {
        if(amount) {
            const region = brasil ? 'Brasil' : 'Exterior';
            const cleanAmount = cleanValue(amount);
            const data = {
                amount: cleanAmount,
                isTransfer: 1,
                region: region
            };
            let result = await api.requestNewDeposit(data);
            if(result.error){
                alert(result.error);
            } else {
                setIdDeposito(result.id);
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


    const [selectedImage, setSelectedImage] = useState(null);

    async function pickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão não concedida!');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.canceled && result.assets.length > 0) {
          const selectedImage = result.assets[0];
          console.log('Imagem selecionada:', selectedImage.uri);
      
          // Faça o processamento adicional com a imagem selecionada aqui
        } else {
          console.log('Nenhuma imagem selecionada ou operação cancelada.');
        }
      }

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É necessário conceder permissão para acessar a galeria.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult);
    }
  };

  const handleSendReceipt = async () => {
    if (selectedImage) {
        const imageData = {
          uri: selectedImage.assets[0].uri,
        };
        const data = {transferId: idDeposito,
            imageData: imageData}
  
        console.log("Imagem selecionada:", imageData.uri);
  
        const result = await api.requestNewDepositImage({data});
  
        setSelectedImage(null);
        setModalVisible(false);
      } else {
        alert('há um erro')
      }
  };
  
    return (
        <C.Container>

            <C.SubContainer>
                
                <C.TitleSubContainer>Dados do usuário:</C.TitleSubContainer>
                
                <C.SubTitleSubContainer>Depósito em nome de:{'\n'}{name}</C.SubTitleSubContainer>
                <C.SubTitleSubContainer>Solicitado por:{'\n'}{name}</C.SubTitleSubContainer>
                
                <C.BankAccountImage source={require('../../../assets/opcoes_pagamento_tablet.png')}/>
                
                <C.TitleSubContainer>{'\n'}Solicitar saque do:</C.TitleSubContainer>

                <View style={{
                    backgroundColor: '#EBECF0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 15}}>
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
                {idDeposito && (
                <View style={styles.viewModalContainer}>
                        <C.TitleSubContainer style={{textAlign: 'center'}} >
                            Informações do Depósito - {idDeposito}
                        </C.TitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Id da Transação: {idDeposito}
                        </C.SubTitleSubContainer>
                        
                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Id do Solicitante: {idCreatedBy}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Id do Usuário: {idUser}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Data e hora da Solicitação: {createdAt}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Solicitado por: {nameCreatedBy}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Nome do Usuário: {nameUser}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Destino: {depositRegion}
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Status: 
                        </C.SubTitleSubContainer>

                        <C.SubTitleSubContainer style={{textAlign: 'center'}}>
                            Comprovante: 
                        </C.SubTitleSubContainer>

                        <C.ButtonArea
          style={{ backgroundColor: "#008000" }}
          onPress={openImagePickerAsync}
        >
          <C.ButtonText>SELECIONAR COMPROVANTE</C.ButtonText>
        </C.ButtonArea>

        {selectedImage && (
          <View style={{ marginTop: 20 }}>
            <Image
              source={{ uri: selectedImage.assets[0].uri }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}

        <C.ButtonArea style={{ backgroundColor: "#008000" }} onPress={handleSendReceipt}>
          <C.ButtonText>ENVIAR COMPROVANTE</C.ButtonText>
        </C.ButtonArea>

                </View>
                )}
            </Modal>


        </C.Container>
    );

}

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