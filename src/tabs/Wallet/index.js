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
                <C.TitleInitial>Carteira</C.TitleInitial>
            </C.ContainerInitial>


            <C.ContainerButton onPress={null}>
                    <C.TitleSubContainer>Depositar</C.TitleSubContainer>
                    <C.InformativeText>Clique para realizar depósito</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={null}>
                    <C.TitleSubContainer>Sacar</C.TitleSubContainer>
                    <C.InformativeText>Clique para realizar saque</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={null}>
                    <C.TitleSubContainer>Investir</C.TitleSubContainer>
                    <C.InformativeText>Clique para realizar um investimento</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={null}>
                    <C.TitleSubContainer>Resgatar</C.TitleSubContainer>
                    <C.InformativeText>Clique para realizar um resgate</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={null}>
                    <C.TitleSubContainer>Transferência Interna</C.TitleSubContainer>
                    <C.InformativeText>Clique para realizar uma transferência interna</C.InformativeText>
            </C.ContainerButton>

        </C.Container>
    );

}