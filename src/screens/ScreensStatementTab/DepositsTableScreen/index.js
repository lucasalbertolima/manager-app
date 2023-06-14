import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency, convertDataAndHours} from '../../../functions';
import { sendReceipt } from '../../../services/apiaxios';
import api from '../../../services/api';
import { FlatList, View, StyleSheet, Modal, Text } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

export default () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [transferId, setTransferId] = useState('');
    const [amount, setAmount] = useState('');
    const [idCreatedBy, setIdCreatedBy] = useState('');
    const [idUser, setIdUser] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [nameCreatedBy, setNameCreatedBy] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [depositRegion, setDepositRegion] = useState('');
    const [statusApproved, setStatusApproved] = useState(null);
    const [statusDisapproved, setStatusDisapproved] = useState(null);
    const [payment, setPayment] = useState(null);
    const [documentUri, setDocumentUri] = useState(null);
    const [typeDocument, setTypeDocument] = useState(null);
    const [nameDocument, setNameDocument] = useState(null);

    const [deposits, setDeposits] = useState([]);
    const [count, setCount] = useState("");


    useEffect(()=>{
        getDepositsHistoric();
    }, []);

    const getDepositsHistoric = async () => {
        const result = await api.getDepositsHistoric();
        if(result && result.deposits) {
            setDeposits(result.deposits)
            setCount(result.count);
        }else{
            alert(result.error);
        }
    }


    const seeMore = (item) => {
        if(item){
        setTransferId(item?.id);
        setAmount(item?.amount);
        setIdCreatedBy(item?.created_by.id);
        setIdUser(item?.user_id);
        setCreatedAt(item?.created_at);
        setNameCreatedBy(item?.user.name);
        setNameUser(item?.user.name);
        setDepositRegion(item?.deposit_region.name);
        setStatusApproved(item?.approved_by);
        setStatusDisapproved(item?.rejected_by);
        setPayment(item?.receipt);
        showModal()
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

    

    return (
            <C.Container>
                {count === "0" && (<Text>Não há Histórico de saques</Text>)}
                <FlatList 
                    data={deposits}
                    renderItem={({item})=>(
                        <C.SubContainer>
                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Data e Hora: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{convertDataAndHours(item.created_at)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Valor: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Saldo: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.balance_available)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Status: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>
                                    {item.approved_at ? 'Aprovado' : item.rejected_at ? 'Reprovado': 'Pendente'}
                                </C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Solicitante: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.created_by.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Origem: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.deposit_region.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.ButtonSeeMore onPress={() => seeMore(item)}>
                                <C.ButtonSeeMoreText>
                                    Ver mais
                                </C.ButtonSeeMoreText>
                            </C.ButtonSeeMore>
                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

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


            {!payment && (
            <>


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
            
            </>

            )}


            <C.ButtonArea style={{ backgroundColor: "#FF0000" }} onPress={showModal}>
              <C.ButtonText>FECHAR</C.ButtonText>
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
  