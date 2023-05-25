import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency} from '../../../functions';


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 
import { Text, FlatList, View } from "react-native";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [rescues, setRescues] = useState([]);
    const [count, setCount] = useState("");


    useEffect(()=>{
        getRescuesHistoric();
    }, []);

    const getRescuesHistoric = async () => {
        const result = await api.getRescuesHistoric();
        if(result && result.rescues) {
            setRescues(result.rescues)
            setCount(result.count);
        }else{
            alert(result.error);
        }
    }

    return (
            <C.Container>
                {count === "0" && (<Text>Não há Histórico a ser mostrado</Text>)}
                <FlatList 
                    data={rescues}
                    renderItem={({item})=>(
                        <C.SubContainer>
                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Data e Hora: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.created_at}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Taxa: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.percentage}%</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Valor: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Produto: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>
                                    {item.symbol.symbol}
                                </C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Solicitante: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.created_by.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Origem: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.symbol.region}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>
                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

            </C.Container>
    );

}