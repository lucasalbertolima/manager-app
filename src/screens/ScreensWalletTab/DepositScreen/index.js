import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import { CheckBox } from 'react-native-elements';


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 
import { View } from "react-native";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [name, setName] = useState("");

    const [brasil, setBrasil] = useState(true);
    const [exterior, setExterior] = useState(false);

    const handleCheck = () => {
        setBrasil(!brasil);
        setExterior(!exterior);
    };

    const [amount, setAmount] = useState("");

    useEffect(()=>{
        getUser();
        getConfig();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setName(result.name);
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

                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Solicitar Depósito</C.ButtonText>
                </C.ButtonArea>

            </C.SubContainer>

        </C.Container>
    );

}