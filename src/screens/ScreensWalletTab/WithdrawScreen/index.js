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
    const [accountNumber, setAccountNumber] = useState("");
    const [bankNumber, setBankNumber] = useState("");
    const [branchNumber, setBranchNumber] = useState("");
    const [typeBank, setTypeBank] = useState("");
    const [variation, setVariation] = useState("");
    const [iban, setIban] = useState("");
    const [swift, setSwift] = useState("");
    const [balanceAvailable, setBalanceAvailable] = useState(0)

    const [minWithdraw, setMinWithdraw] = useState(0);
    const [maxWithdraw, setMaxWithdraw] = useState(0);

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
            setBalanceAvailable(result.balance_available);


            setAccountNumber(result.bank.account_number);
            setBankNumber(result.bank.bank_number);
            setBranchNumber(result.bank.branch_number);
            setTypeBank(result.bank.type);
            setVariation(result.bank?.variation);
            setIban(result.bank?.iban || "");
            setSwift(result.bank?.swift || "");
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
                
                <C.SubTitleSubContainer>Saque em nome de: {name}</C.SubTitleSubContainer>
                <C.SubTitleSubContainer>Solicitado por: {name}</C.SubTitleSubContainer>
                
                
                <C.TitleSubContainer>Dados Bancários Do Usuário:</C.TitleSubContainer>
                
                <C.SubTitleSubContainer>Banco / Bank:</C.SubTitleSubContainer>
                <C.Balance>{bankNumber}</C.Balance>
                
                <C.SubTitleSubContainer>Agência / Branch:</C.SubTitleSubContainer>
                <C.Balance>{branchNumber}</C.Balance>
                
                <C.SubTitleSubContainer>Conta / Account: </C.SubTitleSubContainer>
                <C.Balance>{accountNumber}</C.Balance>
                
                <C.SubTitleSubContainer>Tipo / Type:</C.SubTitleSubContainer>
                <C.Balance>{typeBank === 1 ? "Conta Corrente" : "Conta Poupança"}</C.Balance>
                
                {variation && (
                <>
                <C.SubTitleSubContainer>Variação:</C.SubTitleSubContainer>
                <C.Balance>{variation}</C.Balance>
                </>
                )}

                {iban && (
                <>
                <C.SubTitleSubContainer>Variação:</C.SubTitleSubContainer>
                <C.Balance>{iban}</C.Balance>
                </>
                )}

                {swift && (
                <>
                <C.SubTitleSubContainer>Variação:</C.SubTitleSubContainer>
                <C.Balance>{swift}</C.Balance>
                </>
                )}

            <C.TitleSubContainer>Observações:</C.TitleSubContainer>
                <C.Balance>Saldo Disponível: {formatCurrency(balanceAvailable)}</C.Balance>
                <C.Balance>Saque mínimo de: {formatCurrency(minWithdraw)}</C.Balance>
                <C.Balance>Saque máximo de: {formatCurrency(maxWithdraw)}</C.Balance>
                <C.Balance>Processamento em até {brasil ? '3' : '10'} dias úteis{'\n'}</C.Balance>
                
                <C.TitleSubContainer>Solicitar saque do:</C.TitleSubContainer>

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
                    <C.ButtonText>Solicitar Saque</C.ButtonText>
                </C.ButtonArea>

            </C.SubContainer>

        </C.Container>
    );

}