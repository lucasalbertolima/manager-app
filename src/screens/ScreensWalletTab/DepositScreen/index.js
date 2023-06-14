import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { CheckBox } from 'react-native-elements';
import { StyleSheet, Modal, Text, RefreshControl, View} from "react-native";
import api from '../../../services/api';
import { sendReceipt } from '../../../services/apiaxios';
import * as DocumentPicker from 'expo-document-picker';

export default () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const [statusApproved, setStatusApproved] = useState(null);
  const [statusDisapproved, setStatusDisapproved] = useState(null);
  const [payment, setPayment] = useState(null)

  const handleCheck = () => {
    setBrasil(!brasil);
    setExterior(!exterior);
  };

  const [amount, setAmount] = useState("");
  const [documentUri, setDocumentUri] = useState(null);
  const [typeDocument, setTypeDocument] = useState(null);
  const [nameDocument, setNameDocument] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [requestNewDeposit]);

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
        setDepositRegion(result.deposit_region.name);
        setStatusApproved(result.approved_by);
        setStatusDisapproved(result.rejected_by);
        setPayment(result.receipt)
        showModal();
      }
    } else {
      alert("Preencha os campos corretamente");
    }
  }

  const showModal = () => {
    setModalVisible(!modalVisible);
  }


  const sendDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({});
    setNameDocument(result.name);
    setTypeDocument(result.mimeType);
    setDocumentUri(result.uri) 
    }


  function formData (file){
    let formData = new FormData();
    formData.append('image', {uri: file, type: typeDocument, name: nameDocument});
    return formData;
  }

  const handleSubmitImage = async () => {
    try {
      const datadata = {
        transfer_id: transferId,
        client_id: "",
        image: formData(documentUri)
      };

      const response = await sendReceipt(datadata);
      if(response.receipt){
      alert('comprovante enviado com sucesso')
      showModal();
      setDocumentUri(null)
      }
      
    } catch (error) {
      // Tratar erros
      alert(error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getUser();
    setRefreshing(false);
  };
  
  return (
    <C.Container refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
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
              Status: {statusApproved ? "aprovado" : statusDisapproved ? "reprovado" : "pendente"}
            </C.SubTitleSubContainer>
            <C.SubTitleSubContainer style={{ textAlign: 'center' }}>
              Comprovante: {payment ? 'Enviado' : 'Pendente'}
            </C.SubTitleSubContainer>

            <C.ButtonArea style={{ backgroundColor: "#008000" }} onPress={sendDocument}>
              <C.ButtonText>SELECIONAR COMPROVANTE</C.ButtonText>
            </C.ButtonArea>

            {documentUri && (
              <View style={{ marginTop: 20 , backgroundColor: "#FFF", padding: 10}}>
                <Text>Comprovante:</Text>
                <Text>Nome: {nameDocument}</Text>
                <Text>Formato: {typeDocument}</Text>
              </View>
            )}

            <C.ButtonArea style={{ backgroundColor: "#008000" }} onPress={handleSubmitImage}>
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
