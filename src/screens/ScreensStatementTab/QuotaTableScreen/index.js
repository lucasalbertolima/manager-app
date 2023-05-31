import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { formatCurrency } from "../../../functions";

import api from "../../../services/api";
import { useStateValue } from "../../../contexts/StateContext";
import { Text, FlatList, View} from "react-native";
import {Picker} from '@react-native-picker/picker';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [performances, setPerformances] = useState([]);
  const [count, setCount] = useState("");

  const [symbols, setSymbols] = useState([]);
  const [chosenSymbol, setChosenSymbol] = useState();

  useEffect(() => {
    getQuotaHistoric();
    getSymbols();
  }, []);

  useEffect(() => {
    getQuotaHistoric();
  }, [chosenSymbol]);

  const convertData = (date) => {
    const partesData = date.split("-");
    const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
    return dataFormatada;
  };

  const getQuotaHistoric = async () => {
    const result = await api.getQuotaHistoric(chosenSymbol);
    if (result && result.performances) {
      setPerformances(result.performances);
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
    let acumulado = performances
      .slice(0, index + 1)
      .reduce((acumulado, performance) => acumulado + performance.amount_percentage, 0);
  
    acumulado = acumulado.toFixed(4); // Arredonda para quatro casas decimais

    return (
      <C.SubContainer>
        <C.SubContainerFlex>
          <C.TitleSubContainer>Data e Hora: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{item.date ? convertData(item.date) : ""}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Rendimento: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer style={{ color: item.amount_percentage <= 0 ? 'red' : 'green' }}>{item.amount_percentage}%</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Acumulado: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer style={{ color: acumulado < 0 ? 'red' : 'green' }}>{acumulado}%</C.SubTitleSubContainer>
        </C.SubContainerFlex>
      </C.SubContainer>
    );
  };

  return (
    <C.Container>

<C.TitleSubContainer>Selecione o produto:</C.TitleSubContainer>
                <Picker
                    style={{backgroundColor: "#FFF",
                    borderWidth: 10,
                    borderStyle: "solid",
                    borderColor: "#000",
                    marginBottom: 15,
                    marginTop: 5}}
                    selectedValue={chosenSymbol}
                    onValueChange={(itemValue, itemIndex) =>
                        setChosenSymbol(itemValue)
                    }>
                    <Picker.Item label={symbols[0]?.symbol} value= {symbols[0]?.id} />
                    <Picker.Item label={symbols[1]?.symbol} value= {symbols[1]?.id} />
                    <Picker.Item label={symbols[2]?.symbol} value= {symbols[2]?.id} />
                    <Picker.Item label={symbols[3]?.symbol} value= {symbols[3]?.id} />
                    <Picker.Item label={symbols[4]?.symbol} value= {symbols[4]?.id} />
                </Picker>
      {count === "0" && <Text>Não há Histórico a ser mostrado</Text>}
      <FlatList
        data={performances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </C.Container>
  );
};
