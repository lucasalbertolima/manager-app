import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import {Picker} from '@react-native-picker/picker';


import api from '../../../services/api';
import { View } from "react-native";

export default () => {

    const [balanceAvailableBrasil, setBalanceAvailableBrasil] = useState(0);
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState(0);

    const [symbols, setSymbols] = useState([]);
    const [chosenSymbol, setChosenSymbol] = useState();

    const [amount, setAmount] = useState(0);

    function getSymbolQuota(chosenSymbol, symbols) {
        for (const symbol of symbols) {
          if (symbol && chosenSymbol === symbol.id) {
            return formatCurrency(symbol.quota);
          }
        }
        return '';
      }
    const quota = getSymbolQuota(chosenSymbol, symbols);
    const quotaNumber = parseFloat(quota.replace(/[^0-9,-]+/g, "").replace(",", "."));

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


    const requestNewInvestiment = async () => {
        if(amount && chosenSymbol) {
            const data = {
                amount: amount,
                client_id: "",
                symbol: chosenSymbol
            };
            let result = await api.requestNewInvestiment(data);
            if(result.error){
                alert(result.error);

            } else {
                alert("Investimento realizado com Sucesso");
            } 
        } else {
            alert("Preencha os campos corretamente");
        }

    }

    const moreAmount = (value) => {
        setAmount(amount + value)
    }
    const lessAmount = (value) => {
        if(amount > 0 && amount > value){
        setAmount(amount - value)
        }else{
            setAmount(amount)
        }
    }

    return (
        <C.Container>

            <C.SubContainer>
            {symbols[0] && (
            <>
            
            <C.TitleSubContainer>Selecione o produto:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF"}}
                    selectedValue={chosenSymbol}
                    onValueChange={(itemValue, itemIndex) => setChosenSymbol(itemValue)
                    }>
                    {symbols.map((symbol, index) => {
                        if (symbol) {
                        return (
                            <Picker.Item
                            key={symbol.id}
                            label={symbol.symbol}
                            value={symbol.id}
                            />
                        );
                        } else {
                        return null; // Não renderizar o Picker.Item se o elemento estiver ausente
                        }
                    })}
                </Picker>
                

                    <C.TitleSubContainer>Informações:</C.TitleSubContainer>
                    <C.Balance>Valor do Produto:{' '} 
                        {quota}</C.Balance>
                        <C.Balance>
                        Investimento Mínimo:{' '}
                        {symbols.map((symbol) => {
                            if (symbol && chosenSymbol === symbol.id) {
                            return formatCurrency(symbol.minimum_investment);
                            }
                            return null;
                        })}
                        </C.Balance>
                    <C.Balance>Seu Saldo Disponível:{' '}
                        {chosenSymbol === symbols[0].id ? formatCurrency(balanceAvailableBrasil)
                         : formatCurrency(balanceAvailableExterior)}
                    </C.Balance>
                    <C.Balance>
                        Produto Escolhido:{' '}
                        {symbols.map((symbol) => {
                            if (symbol && chosenSymbol === symbol.id) {
                            return symbol.symbol;
                            }
                            return null;
                        })}
                    </C.Balance>


                    <C.TitleSubContainer>Seu Investimento:</C.TitleSubContainer>
                    <C.Balance>Cotas: {amount ? (amount/quotaNumber).toFixed(4) : '0'}</C.Balance>
                    <C.Balance>Valor Total: {amount ? `R$ ${amount},00` : '0,00'}</C.Balance>
                
                    </>
                )}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <C.ButtonValue onPress={() => lessAmount(1000)}>
                        <C.ButtonValueText>- R$ 1.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    <C.ButtonValue onPress={() => moreAmount(1000)}>
                        <C.ButtonValueText>+ R$ 1.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <C.ButtonValue onPress={() => lessAmount(10000)}>
                        <C.ButtonValueText>- R$ 10.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    <C.ButtonValue onPress={() => moreAmount(10000)}>
                        <C.ButtonValueText>+ R$ 10.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <C.ButtonValue onPress={() => lessAmount(100000)}>
                        <C.ButtonValueText>- R$ 100.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    <C.ButtonValue onPress={() => moreAmount(100000)}>
                        <C.ButtonValueText>+ R$ 100.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <C.ButtonArea onPress={requestNewInvestiment}>
                        <C.ButtonText>Investir</C.ButtonText>
                    </C.ButtonArea>
                    </View>

            </C.SubContainer>

        </C.Container>

        
    );

}