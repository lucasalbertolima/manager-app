import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { formatCurrency } from "../../../functions";
import { format, parseISO  } from 'date-fns';

import api from "../../../services/api";
import { useStateValue } from "../../../contexts/StateContext";
import { Text, FlatList, View} from "react-native";
import {Picker} from '@react-native-picker/picker';

export default () => {

  const [performances, setPerformances] = useState([]);
  const [count, setCount] = useState();

  const [symbols, setSymbols] = useState([]);
  const [chosenSymbol, setChosenSymbol] = useState();

  useEffect(() => {
    getIncomesPerDayHistoric();
    getSymbols();
  }, []);

  useEffect(() => {
    getIncomesPerDayHistoric();
  }, [chosenSymbol]);


  const getIncomesPerDayHistoric = async () => {
    const result = await api.getIncomesPerDayHistoric(chosenSymbol);
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
  let acumulado = 0;
  for (let i = index; i < performances.length; i++) {
    acumulado += performances[i]?.performance?.amount_percentage || 0;
  }
  acumulado = acumulado.toFixed(4); // Arredonda para quatro casas decimais

  const formattedDate = format(parseISO(item?.performance.date), "dd/MM/yyyy");

  return (
    <C.SubContainer>
      <C.SubContainerFlex>
        <C.TitleSubContainer>Data: {" "}</C.TitleSubContainer>
        <C.SubTitleSubContainer>{formattedDate}</C.SubTitleSubContainer>
      </C.SubContainerFlex>

      <C.SubContainerFlex>
        <C.TitleSubContainer>Valor: {" "}</C.TitleSubContainer>
        <C.SubTitleSubContainer style={{ color: item?.amount <= 0 ? 'red' : 'green' }}>{formatCurrency(item?.amount)}</C.SubTitleSubContainer>
      </C.SubContainerFlex>

      <C.SubContainerFlex>
        <C.TitleSubContainer>Rendimento: {" "}</C.TitleSubContainer>
        <C.SubTitleSubContainer style={{ color: item?.performance?.amount_percentage < 0 ? 'red' : 'green' }}>{item?.performance?.amount_percentage ? `${item.performance.amount_percentage}` : '0'}%</C.SubTitleSubContainer>
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
      data={performances}
      renderItem={renderItem}
      keyExtractor={(item) => item.performance.id}
    />
  </C.Container>
);
};