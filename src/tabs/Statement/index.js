import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [user, setUser] = useState()

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setUser(result.name);
        }else{
            alert(result.error);
        }
    }

    return (
        <C.Container>
            <C.ContainerInitial>
                <C.TitleInitial>Extrato</C.TitleInitial>
            </C.ContainerInitial>


            <C.ContainerButton onPress={() => navigation.navigate('HistoricTableScreen')}>
                    <C.TitleSubContainer>Histórico</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('DepositsTableScreen')}>
                    <C.TitleSubContainer>Depósitos</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('WithdrawsTableScreen')}>
                    <C.TitleSubContainer>Saques</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('InvestmentsTableScreen')}>
                    <C.TitleSubContainer>Investimentos</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('RescuesTableScreen')}>
                    <C.TitleSubContainer>Resgates</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('InternalTransfersTableScreen')}>
                    <C.TitleSubContainer>Tranferências Internas</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('QuotaTableScreen')}>
                    <C.TitleSubContainer>Histórico da Cota</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('CdiTableScreen')}>
                    <C.TitleSubContainer>CDI</C.TitleSubContainer>
                    <C.InformativeText>Clique para ver mais</C.InformativeText>
            </C.ContainerButton>


        </C.Container>
    );

}