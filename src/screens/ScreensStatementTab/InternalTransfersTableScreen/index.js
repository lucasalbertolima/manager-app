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

    const [internalTransfers, setInternalTransfers] = useState([]);
    const [count, setCount] = useState("");


    useEffect(()=>{
        getInternalTransfersHistoric();
    }, []);

    const getInternalTransfersHistoric = async () => {
        const result = await api.getInternalTransfersHistoric();
        if(result && result['internal-transfers']) {
            setInternalTransfers(result['internal-transfers']);
            setCount(result.count)
        }else{
            alert(result.error);
        }
    }
    return (
            <C.Container>
                {count === "0" && (<Text>Não há Histórico de Transferências Internas</Text>)}
                <FlatList 
                    data={internalTransfers}
                    renderItem={({item})=>(
                        <C.SubContainer>
                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Data e Hora: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{''}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Valor: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Formato: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{`Do  para  o `}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Status: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>
                                    {''}
                                </C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Solicitante: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.created_by.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

            </C.Container>
    );

}