import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import {Picker} from '@react-native-picker/picker';


import api from '../../../services/api';
import { View } from "react-native";

export default () => {

    const [symbols, setSymbols] = useState([]);
    const [chosenSymbol, setChosenSymbol] = useState();
    const [symbolValues, setSymbolValues] = useState([])
    const [amount, setAmount] = useState(0);


    

    function getInvestmentMinimum(chosenSymbol, symbols) {
        for (const symbol of symbols) {
          if (symbol && chosenSymbol === symbol.id) {
            return formatCurrency(symbol.minimum_investment);
          }
        }
        return '';
      }
    const minimumInvestment = getInvestmentMinimum(chosenSymbol, symbolValues);

    useEffect(()=>{
        getBalancesPerSymbol();
        getSymbols();
    }, []);
    useEffect(()=>{
        getBalancesPerSymbol();
    }, [chosenSymbol]);

    const getBalancesPerSymbol = async () => {
        const result = await api.getBalancesPerSymbol();
        if(result) {
            setSymbols(result.symbols);
        }else{
            alert(result.error);
        }
    }

    const getSymbols = async () => {
        const result = await api.getSymbols();
        if(result) {
            setSymbolValues(result)
        }else{
            console.log(result)
        }
    }


    const requestNewInvestiment = async () => {
        if(amount && chosenSymbol) {
            const data = {
                amount: amount,
                client_id: "",
                symbol: chosenSymbol
            };
            console.log(data)
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

    const moreAmount = () => {
        setAmount(amount + 1000)
    }
    const lessAmount = () => {
        if(amount>0){
        setAmount(amount - 1000)
        }else{
            setAmount(0)
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
                    <C.Balance>Taxa de Resgate Antecipado:{' '} 5%</C.Balance>
                    
                    <C.Balance>Investimento Mínimo:{' '} {minimumInvestment ? minimumInvestment : '0'}</C.Balance>

                    <C.Balance>Seu Saldo Disponível:{' '}
                        {formatCurrency(symbols[0]?.amount)}
                    </C.Balance>
                    <C.Balance>
                        Produto Escolhido:{' '}
                        {symbols[0]?.symbol_id}
                    </C.Balance>


                    <C.TitleSubContainer>Observações:</C.TitleSubContainer>
                    <C.Balance>
                        Você pode realizar uma retirada parcial de até: {formatCurrency(symbols[0]?.amount)} ou uma retirada todal de: {formatCurrency(symbols[0]?.amount)}
                    </C.Balance>
                
                    </>
                )}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <C.ButtonValue onPress={lessAmount}>
                        <C.ButtonValueText>- R$ 1.000,00</C.ButtonValueText>
                    </C.ButtonValue>
                    <C.ButtonValue onPress={moreAmount}>
                        <C.ButtonValueText>+ R$ 1.000,00</C.ButtonValueText>
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