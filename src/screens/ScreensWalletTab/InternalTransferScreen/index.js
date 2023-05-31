import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import { CheckBox } from 'react-native-elements';
import { Modal, View, StyleSheet } from "react-native";


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [balanceAvailable, setBalanceAvailable] = useState(0);
    const [balanceAvailableBrasil, setBalanceAvailableBrasil] = useState(0);
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const [minWithdraw, setMinWithdraw] = useState(0);
    const [maxWithdraw, setMaxWithdraw] = useState(0);

    const [brasil, setBrasil] = useState(true);
    const [exterior, setExterior] = useState(false);

    const handleCheck = () => {
        setBrasil(!brasil);
        setExterior(!exterior);
    };

    const [amount, setAmount] = useState();

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
      

    useEffect(()=>{
        getUser();
        getConfig();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setBalanceAvailable(result.balance_available);
            setBalanceAvailableBrasil(result.balances_available.Brasil);
            setBalanceAvailableExterior(result.balances_available.Exterior);

        }else{
            alert(result.error);
        }
    }

    const getConfig = async () => {
        const result = await api.getConfig();
        if(result) {
            setMinWithdraw(result[1].value);
            setMaxWithdraw(result[2].value)
        }else{
            alert(result.error);
        }
    }

    const showModal = () => {
        setModalVisible(!modalVisible);
    }


    const requestNewInternalTransfer = async () => {
        if(amount) {
            const from = brasil ? 'Brasil' : 'Exterior';
            const to = brasil ? 'Exterior' : 'Brasil';
            const cleanAmount = cleanValue(amount);
            const data = {
                amount: cleanAmount,
                from: from,
                to: to
            };
            let result = await api.requestNewInternalTransfer(data);
            if(result.error){
                alert(result.error);
                showModal();
            } else {
                showModal();
                alert("Transferência Interna Solicita com Sucesso");
            } 
        } else {
            alert("Preencha os campos corretamente");
            showModal();
        }

    }

    return (
        <C.Container>

            <C.SubContainer>
                
                    <C.Balance>Saldo Total Disponível: {formatCurrency(balanceAvailable)}</C.Balance>
                    <C.Balance>Saldo Brasil: {formatCurrency(balanceAvailableBrasil)}</C.Balance>
                    <C.Balance>Saldo Exterior: {formatCurrency(balanceAvailableExterior)}</C.Balance>
                
                <C.TitleSubContainer>Solicitar Transferência Interna do:</C.TitleSubContainer>

                <View style={{
                    backgroundColor: '#EBECF0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15}}>
                <CheckBox
                    containerStyle={{ backgroundColor: '#EBECF0' }}
                    title='Brasil para Exterior'
                    checked={brasil}
                    onPress={handleCheck}
                />
                <CheckBox
                    containerStyle={{ backgroundColor: '#EBECF0' }}
                    title='Exterior para Brasil'
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
                    onChangeText={(t) => {setAmount(t)}}
                />

                <C.ButtonArea onPress={showModal}>
                    <C.ButtonText>Solicitar Transferência Interna</C.ButtonText>
                </C.ButtonArea>

                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    style={styles.modalContainer}
                >
                    {brasil && (
                    <View style={styles.viewModalContainer}>
                            <C.TitleSubContainer style={{textAlign: 'center'}} >Você tem certeza que deseja transferir R$ {amount ? amount : '0,00'} do Brasil para o Exterior? {'\n'}
                            </C.TitleSubContainer>
                            
                            <C.TitleSubContainer style={{textAlign: 'center'}}>
                            O tempo de transferência será de até 3 dias úteis.
                            </C.TitleSubContainer>

                            <C.ButtonArea style={{backgroundColor: '#008000'}} onPress={requestNewInternalTransfer}>
                                <C.ButtonText>CONFIRMAR</C.ButtonText>
                            </C.ButtonArea>

                            <C.ButtonArea style={{backgroundColor: '#FF0000'}} onPress={showModal}>
                                <C.ButtonText>CANCELAR</C.ButtonText>
                            </C.ButtonArea>
                    </View>
                     )}

                    {!brasil && (
                            <View style={styles.viewModalContainer}>
                            <C.TitleSubContainer style={{textAlign: 'center'}} >Você tem certeza que deseja transferir R$ {amount ? amount : '0,00'} do Exterior para o Brasil? {'\n'}
                            </C.TitleSubContainer>
                            
                            <C.TitleSubContainer style={{textAlign: 'center'}}>
                            O tempo de transferência será de até 10 dias úteis.
                            </C.TitleSubContainer>

                            <C.ButtonArea style={{backgroundColor: '#008000'}} onPress={requestNewInternalTransfer}>
                                <C.ButtonText>CONFIRMAR</C.ButtonText>
                            </C.ButtonArea>

                            <C.ButtonArea style={{backgroundColor: '#FF0000'}} onPress={showModal}>
                                <C.ButtonText>CANCELAR</C.ButtonText>
                            </C.ButtonArea>
                    </View>
                     )}
                </Modal>

            </C.SubContainer>

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