import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency, convertDataAndHours} from '../../../functions';
import { getInternalTransfers } from "../../../services/apiaxios";

import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 
import { Text, FlatList, View } from "react-native";

export default () => {


    const [internalTransfers, setInternalTransfers] = useState([]);
    const [count, setCount] = useState("");


    useEffect(()=>{
        getInternalTransfersHistoric();
    }, []);

    const getInternalTransfersHistoric = async () => {
        const result = await getInternalTransfers();
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
                                <C.SubTitleSubContainer>{convertDataAndHours(item.created_at)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Data da Liberação: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{convertDataAndHours(item.approved_at)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Valor: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Origem: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.from}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Destino: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.to}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Status: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>
                                    {item.approved_at ? 'Aprovado' : item.rejected_at ? 'Reprovado': 'Pendente'}
                                </C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

            </C.Container>
    );

}