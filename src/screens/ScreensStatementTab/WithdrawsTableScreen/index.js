import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import {formatCurrency, convertDataAndHours} from '../../../functions';


import api from '../../../services/api';
import { useStateValue } from '../../../contexts/StateContext'; 
import { Text, FlatList, View } from "react-native";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [withdraws, setWithdraws] = useState([]);
    const [count, setCount] = useState("");


    useEffect(()=>{
        getWithdrawsHistoric();
    }, []);

    const getWithdrawsHistoric = async () => {
        const result = await api.getWithdrawsHistoric();
        if(result && result.withdraws) {
            setWithdraws(result.withdraws);
            setCount(result.count);

        }else{
            alert(result.error);
        }
    }

    return (
            <C.Container>
                {count === "0" && (<Text>Não há Histórico de saques</Text>)}
                <FlatList 
                    data={withdraws}
                    renderItem={({item})=>(
                        <C.SubContainer>
                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Data e Hora: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{convertDataAndHours(item.created_at)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Valor: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Saldo: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.balance_available)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Status: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>
                                    {item.approved_at ? 'Aprovado' : item.rejected_at ? 'Reprovado': 'Pendente'}
                                </C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Solicitante: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.created_by.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Origem: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.deposit_region.name}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>
                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

            </C.Container>
    );

}