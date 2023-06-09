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
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [historic, setHistoric] = useState([]);
  const [count, setCount] = useState("0");

  const [symbols, setSymbols] = useState([]);
  const [chosenSymbol, setChosenSymbol] = useState();

  useEffect(() => {
    getIncomesPerMonthHistoric();
    getSymbols();
  }, []);

  useEffect(() => {
    getIncomesPerMonthHistoric();
  }, [chosenSymbol]);


  const getIncomesPerMonthHistoric = async () => {
    const result = await api.getIncomesPerMonthHistoric(chosenSymbol);
    if (result.error) {
      alert(result.error);
    } else {
      setHistoric(result);
      setCount("1");
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

  const renderItem = ({ item }) => {
    const date = parseISO(item?.date);
    const formattedDate = format(date, 'MM/yyyy');

    return (
      <C.SubContainer>
        <C.SubContainerFlex>
          <C.TitleSubContainer>Mês: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer>{formattedDate}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Valor: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer style={{ color: item?.amount < 0 ? 'red' : 'green' }}>{item?.amount ? formatCurrency(item?.amount) : ''}</C.SubTitleSubContainer>
        </C.SubContainerFlex>

        <C.SubContainerFlex>
          <C.TitleSubContainer>Rendimento: {" "}</C.TitleSubContainer>
          <C.SubTitleSubContainer style={{ color: item?.amount_percentage < 0 ? 'red' : 'green' }}>{item?.amount_percentage}%</C.SubTitleSubContainer>
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
        data={historic}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </C.Container>
  );
};
