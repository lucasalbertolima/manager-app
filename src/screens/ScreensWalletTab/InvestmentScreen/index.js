import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import {Picker} from '@react-native-picker/picker';


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [balanceAvailableBrasil, setBalanceAvailableBrasil] = useState(0);
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState(0);

    const [symbols, setSymbols] = useState([]);
    const [chosenSymbol, setChosenSymbol] = useState();

    const [amount, setAmount] = useState();

      

    useEffect(()=>{
        getUser();
        getSymbols();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setBalanceAvailableBrasil(result.balances_available.Brasil);
            setBalanceAvailableExterior(result.balances_available.Exterior);

        }else{
            alert(result.error);
        }
    }

    const getSymbols = async () => {
        const result = await api.getSymbols();
        if(result) {
            setSymbols(result);
            setChosenSymbol(result[0].id);
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


    const requestNewInvestiment = async () => {
        if(amount && chosenSymbol) {
            const cleanAmount = cleanValue(amount);
            const data = {
                amount: cleanAmount,
                client_id: "",
                symbol: chosenSymbol
            };
            let result = await api.requestNewInvestiment(data);
            if(result.error){
                alert(result.error);

            } else {
                alert("Transferência Interna Solicita com Sucesso");
            } 
        } else {
            alert("Preencha os campos corretamente");
        }

    }

    return (
        <C.Container>

            <C.SubContainer>
            {symbols[0] && (
            <>
            
            <C.TitleSubContainer>Selecione o produto:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF",
                    borderWidth: 10,
                    borderStyle: "solid",
                    borderColor: "#000",
                    marginBottom: 5,
                    marginTop: 5}}
                    selectedValue={chosenSymbol}
                    onValueChange={(itemValue, itemIndex) =>
                        setChosenSymbol(itemValue)
                    }>
                    <Picker.Item label={symbols[0]?.symbol} value= {symbols[0].id} />
                    <Picker.Item label={symbols[1]?.symbol} value= {symbols[1].id} />
                    <Picker.Item label={symbols[2]?.symbol} value= {symbols[2].id} />
                    <Picker.Item label={symbols[3]?.symbol} value= {symbols[3].id} />
                    <Picker.Item label={symbols[4]?.symbol} value= {symbols[4].id} />
                </Picker>
                

                    <C.TitleSubContainer>Informações:</C.TitleSubContainer>
                    <C.Balance>Valor do Produto:{' '} 
                        {chosenSymbol == symbols[0].id ? formatCurrency(symbols[0].quota)
                         : chosenSymbol == symbols[1].id ? formatCurrency(symbols[1].quota)
                         : chosenSymbol == symbols[2].id ? formatCurrency(symbols[2].quota)
                         : chosenSymbol == symbols[3].id ? formatCurrency(symbols[3].quota)
                         : chosenSymbol == symbols[4].id ? formatCurrency(symbols[4].quota)
                         : ''}</C.Balance>
                    <C.Balance>Investimento Mínimo:{' '}  
                        {chosenSymbol == symbols[0].id ? formatCurrency(symbols[0].minimum_investment)
                         : chosenSymbol == symbols[1].id ? formatCurrency(symbols[1].minimum_investment)
                         : chosenSymbol == symbols[2].id ? formatCurrency(symbols[2].minimum_investment)
                         : chosenSymbol == symbols[3].id ? formatCurrency(symbols[3].minimum_investment)
                         : chosenSymbol == symbols[4].id ? formatCurrency(symbols[4].minimum_investment)
                         : ''}
                    </C.Balance>
                    <C.Balance>Seu Saldo Disponível:{' '}
                        {chosenSymbol === symbols[0].id ? formatCurrency(balanceAvailableBrasil)
                         : formatCurrency(balanceAvailableExterior)}
                    </C.Balance>
                    <C.Balance>Produto Escolhido:{' '}
                        {chosenSymbol == symbols[0].id ? symbols[0].symbol
                         : chosenSymbol == symbols[1].id ? symbols[1].symbol
                         : chosenSymbol == symbols[2].id ? symbols[2].symbol
                         : chosenSymbol == symbols[3].id ? symbols[3].symbol
                         : chosenSymbol == symbols[4].id ? symbols[4].symbol
                         : 'R$ 0,00'}
                    </C.Balance>

                    <C.TitleSubContainer>Seu Investimento:</C.TitleSubContainer>
                    <C.Balance>Cotas: {formatCurrency(balanceAvailableExterior)}</C.Balance>
                    <C.Balance>Valor Total: {formatCurrency(balanceAvailableExterior)}</C.Balance>
                
                    </>
                )}

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

                <C.ButtonArea onPress={requestNewInvestiment}>
                    <C.ButtonText>Investir</C.ButtonText>
                </C.ButtonArea>

            </C.SubContainer>

        </C.Container>

        
    );

}