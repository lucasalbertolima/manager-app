import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';
import C from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [accountNumber, setAccountNumber] = useState("");
    const [bankNumber, setBankNumber] = useState("");
    const [branchNumber, setBranchNumber] = useState("");
    const [typeBank, setTypeBank] = useState("");
    const [variation, setVariation] = useState("");
    const [iban, setIban] = useState("");
    const [swift, setSwift] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState();

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setAccountNumber(result.bank.account_number);
            setBankNumber(result.bank.bank_number);
            setBranchNumber(result.bank.branch_number);
            setTypeBank(result.bank.type);
            setVariation(result.bank.variation);
            setIban(result.bank?.iban || "");
            setSwift(result.bank?.swift || "");
        }else{
            alert(result.error);
        }
    }

    const handleUpdateProfileButton = async () => {
        if(accountNumber && bankNumber && branchNumber) {
            const data = {
                account_number: accountNumber,
                bank_number: bankNumber,
                branch_number: branchNumber,
                iban: iban,
                swift: swift,
                type: typeBank,
                variation: variation,
            };
            let result = await api.updateBankAccount(data);
            if(result.errors){
                alert(result.errors[0]);
            } else {
                alert("Seus dados foram atualizados com sucesso");
            } 
        } else {
            alert("Preencha os campos corretamente");
        }

    }

    

    return (
        <C.Container>
            <C.SubContainer>
                <C.TitleSubContainer>Agência:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={branchNumber ? branchNumber : ""}
                    onChangeText={t=>setBranchNumber(t)}
                />

                <C.TitleSubContainer>Conta:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={accountNumber ? accountNumber : ""}
                    onChangeText={t=>setAccountNumber(t)}
                />

                <C.TitleSubContainer>Número do Banco:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={bankNumber ? bankNumber : ""}
                    onChangeText={t=>setBankNumber(t)}
                />

                <C.TitleSubContainer>Tipo da conta:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF"}}
                    selectedValue={typeBank}
                    onValueChange={(itemValue, itemIndex) =>
                        setTypeBank(itemValue)
                    }>
                    <Picker.Item label="Conta Corrente" value= {1} />
                    <Picker.Item label="Conta poupança" value= {0} />
                </Picker>
                

                <C.TitleSubContainer>Variação:</C.TitleSubContainer>
                <C.TextInputContainer
                    value={variation  ? variation : ""}
                    onChangeText={t=>setVariation(t)}
                />

                {iban && (
                <>
                    <C.TitleSubContainer>Iban:</C.TitleSubContainer>
                    <C.TextInputContainer
                    value={iban ? iban : ""}
                    onChangeText={(t) => setIban(t)}
                    />
                </>
                )}

                {swift && (
                <>
                    <C.TitleSubContainer>Swift</C.TitleSubContainer>
                    <C.TextInputContainer
                    value={swift ? swift : ""}
                    onChangeText={(t) => setSwift(t)}
                    />
                </>
                )}

            <C.ButtonArea onPress={handleUpdateProfileButton}>
                <C.ButtonText>Salvar Dados</C.ButtonText>
            </C.ButtonArea>

            </C.SubContainer>

        </C.Container>
    );

}