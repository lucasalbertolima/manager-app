import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { formatCurrency } from '../../functions'


import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [nameUser, setNameUser] = useState()
    const [balanceAvailable, setBalanceAvailable] = useState()
    const [balanceAvailableBrazil, setBalanceAvailableBrazil] = useState()
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState()

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setNameUser(result.name);
            setBalanceAvailable(result.balance_available);
            setBalanceAvailableBrazil(result.balances_available.Brasil);
            setBalanceAvailableExterior(result.balances_available.Exterior);
        }else{
            alert(result.error);
        }
    }

    return (
        <C.Container>
            <C.ContainerInitial>
                <C.TitleInitial>Olá, {nameUser}</C.TitleInitial>
            </C.ContainerInitial>
            <C.SubContainer>
                <C.TitleSubContainer>Seu Patrimônio</C.TitleSubContainer>
                <C.Balance>R$ 0,00</C.Balance>
                <C.InformativeText>* Este valor representa a soma do saldo disponível e de todos os produtos investidos em sua conta.</C.InformativeText>
            </C.SubContainer>

            <C.ContainerRoundButton>

            <C.RoundButtonArea>
                <C.RoundButton onPress={() => navigation.navigate('DepositScreen')}>
                    <C.RoundButtonImage source={require('../../assets/deposit.png')} />
                </C.RoundButton>
                <C.RoundButtonText>Depositar</C.RoundButtonText>
            </C.RoundButtonArea>

            <C.RoundButtonArea>
                <C.RoundButton  onPress={() => navigation.navigate('WithdrawScreen')}>
                    <C.RoundButtonImage source={require('../../assets/withdraw.png')} />
                </C.RoundButton>
                <C.RoundButtonText>Sacar</C.RoundButtonText>
            </C.RoundButtonArea>

            <C.RoundButtonArea>
                <C.RoundButton onPress={() => navigation.navigate('InvestmentScreen')}>
                    <C.RoundButtonImage source={require('../../assets/profits.png')} />
                </C.RoundButton>
                <C.RoundButtonText>Investir</C.RoundButtonText>
            </C.RoundButtonArea>

            </C.ContainerRoundButton>

            <C.SubContainer>
                <C.TitleSubContainer>Detalhes</C.TitleSubContainer>
                <C.SubTitleSubContainer>Investimento</C.SubTitleSubContainer>
                <C.Balance>{formatCurrency(balanceAvailable)}</C.Balance>
                <C.SubTitleSubContainer>Saldo Disponível no Brasil</C.SubTitleSubContainer>
                <C.Balance>{formatCurrency(balanceAvailableBrazil)}</C.Balance>
                <C.SubTitleSubContainer>Saldo Disponível no Exterior</C.SubTitleSubContainer>
                <C.Balance>{formatCurrency(balanceAvailableExterior)}</C.Balance>
            </C.SubContainer>
            
        </C.Container>
    );

}