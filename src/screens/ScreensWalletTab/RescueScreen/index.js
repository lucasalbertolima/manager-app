import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions'
import {Picker} from '@react-native-picker/picker';
import { getSymbolInfo, newRescueRequest } from '../../../services/apiaxios';


import api from '../../../services/api';
import { View } from "react-native";

export default () => {

    const [symbols, setSymbols] = useState([]);
    const [chosenSymbol, setChosenSymbol] = useState();
    const [minimumInvestment, setMinimumInvestment] = useState()
    const [amount, setAmount] = useState(0);
    const [earlyWithdrawFee, setEarlyWithdrawFee] = useState(5)

    const [symbol, setSymbol] = useState(0);

    const cleanValue = (value) => {
        if (!value || value === '') {
          return 0;
        }
    
        const cleanAmount = value.replace(/[^0-9]/g, '');
        return Number(cleanAmount) / 100;
      };

    const valuePartial = cleanValue(symbols[symbol]?.amount) - cleanValue(minimumInvestment);

    useEffect(()=>{
        getBalancesPerSymbol();
        getConfig();
        getSymbol();
    }, []);

    useEffect(()=>{
        getSymbol();
    }, [chosenSymbol]);

    useEffect(() => {
        const symbolIndex = symbols.findIndex(
          (symbol) => symbol.symbol_id === chosenSymbol
        );
        if (symbolIndex !== -1) {
          setSymbol(symbolIndex);
        }
      }, [chosenSymbol]);
      


    const getBalancesPerSymbol = async () => {
        const result = await api.getBalancesPerSymbol();
        if(result) {
            setSymbols(result.symbols);
            setChosenSymbol(result.symbols[0].symbol_id)
        }else{
            alert(result.error);
        }
    }

    const getConfig = async () => {
      const result = await api.getConfig();
      if(result) {
          setEarlyWithdrawFee(result[0].value);
      }
  }

    const getSymbol = async () => {
        const result = await getSymbolInfo(data = chosenSymbol);
        if(result) {
            setMinimumInvestment(result.minimum_investment)
        }else{
            console.log(result)
        }
    }


    const handleRescue = async () => {
        const cleanAmount = cleanValue(amount);
        try {
          if(cleanAmount > 0){
          const data = {
            amount: cleanAmount,
            client_id: "",
            symbol: chosenSymbol
          };
    
          const response = await newRescueRequest(data);
          if (response) {
            alert('Resgate Solicitado com Sucesso!')
          }} else {
            alert('Há algo errado no valor solicitado')
          }
        } catch (error) {
          // Tratar erros
          alert('Houve um erro no seu pedido de Resgate, verifique os requisitos');
        }
      };

    

    return (
        <C.Container>

            <C.SubContainer>
            {symbols[symbol] && (
            <>
            
            <C.TitleSubContainer>Selecione o produto:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF"}}
                    selectedValue={chosenSymbol}
                    onValueChange={(itemValue, itemIndex) => setChosenSymbol(itemValue)
                    }>
                    {symbols.map((symbols, index) => {
                        if (symbols) {
                        return (
                            <Picker.Item
                            key={symbols.symbol_id}
                            label={symbols.symbol}
                            value={symbols.symbol_id}
                            />
                        );
                        } else {
                        return null; // Não renderizar o Picker.Item se o elemento estiver ausente
                        }
                    })}
                </Picker>
                

                    <C.TitleSubContainer>Informações:</C.TitleSubContainer>
                    <C.Balance>Taxa de Resgate Antecipado:{' '} {earlyWithdrawFee}%</C.Balance>
                    
                    <C.Balance>Investimento Mínimo:{' '} {minimumInvestment ? formatCurrency(minimumInvestment) : '0'}</C.Balance>

                    <C.Balance>Seu Saldo Disponível:{' '}
                        {formatCurrency(symbols[symbol]?.amount)}
                    </C.Balance>
                    <C.Balance>
                        Produto Escolhido:{' '}
                        {symbols[symbol]?.symbol}
                    </C.Balance>


                    <C.TitleSubContainer>Observações:</C.TitleSubContainer>
                    <C.Balance>
                        Você pode realizar uma retirada parcial de até: {formatCurrency(valuePartial)} ou uma retirada total de: {formatCurrency(symbols[symbol]?.amount)}
                    </C.Balance>
                
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
                        onChangeText={(t) => {
                            setAmount(t);
                        }}
                    />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <C.ButtonArea onPress={handleRescue}>
              <C.ButtonText>Resgatar</C.ButtonText>
            </C.ButtonArea>
            </View>
            </C.SubContainer>

        </C.Container>

        
    );

}