import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { formatCurrency, convertDataAndHours, variation } from "../../../functions";
// Futuramente filtrar por datas
import DateTimePicker from '@react-native-community/datetimepicker';

import api from "../../../services/api";
import { useStateValue } from "../../../contexts/StateContext";
import { Text, FlatList, View} from "react-native";
import {Picker} from '@react-native-picker/picker';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [investments, setInvestments] = useState([]);
  const [count, setCount] = useState("");

  const [symbols, setSymbols] = useState([]);
  const [chosenSymbol, setChosenSymbol] = useState();

  useEffect(() => {
    getInvestmentsHistoric();
    getSymbols();
  }, []);

  useEffect(() => {
    getInvestmentsHistoric();
  }, [chosenSymbol]);


  const getInvestmentsHistoric = async () => {
    const result = await api.getInvestmentsHistoric(chosenSymbol);
    if (result && result.investments) {
      setInvestments(result.investments);
      setCount(result.count);
    } else {
      alert(result.error);
    }
  };

  const getSymbols = async () => {
    const result = await api.getSymbols();
    if(result) {
        setSymbols(result);
        setChosenSymbol(result[0].id);
    }else{
        alert(result.error);
    }
}

  const renderItem = ({ item, index }) => {
    let acumulado = investments
      .slice(0, index + 1)
      .reduce((acumulado, investments) => acumulado + investments.gain, 0);
  
    acumulado = acumulado.toFixed(4); // Arredonda para quatro casas decimais

    return (
      <C.SubContainer>
        <C.SubContainerFlex>
          <C.TitleSubContainer>Início do Investimento: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{item.created_at ? convertDataAndHours(item.created_at) : ""}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Gerado em: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{convertDataAndHours(item.real_created_at)}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Cota Aplicação: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{formatCurrency(item.quota_history)}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Cota Atual: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{formatCurrency(item.symbol.quota)}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Valor Aplicado: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{formatCurrency(item.amount_invested)}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Quantidade de Cotas: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{item.quota}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Variação: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer style={{ color: variation(item.amount, item.amount_invested) < 0 ? 'red' : 'green' }}>{variation(item.amount, item.amount_invested)}%</C.SubTitleSubContainer>
        </C.SubContainerFlex>
      </C.SubContainer>
    );
  };

  return (
    <C.Container>

<C.TitleSubContainer>Selecione o produto:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF"}}
                    selectedValue={chosenSymbol}
                    onValueChange={(itemValue, itemIndex) =>
                        setChosenSymbol(itemValue)
                    }>
                    <Picker.Item label={symbols[0]?.symbol} value= {symbols[0]?.id} />
                    <Picker.Item label={symbols[1]?.symbol} value= {symbols[1]?.id} />
                    <Picker.Item label={symbols[2]?.symbol} value= {symbols[2]?.id} />
                    <Picker.Item label={symbols[3]?.symbol} value= {symbols[3]?.id} />
                    <Picker.Item label={symbols[4]?.symbol} value= {symbols[4]?.id} />
                    <Picker.Item label={symbols[5]?.symbol} value= {symbols[5]?.id} />
                </Picker>
      {count === "0" && <Text>Não há Histórico a ser mostrado</Text>}
      <FlatList
        data={investments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </C.Container>
  );
};
