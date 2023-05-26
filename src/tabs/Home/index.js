import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { formatCurrency } from '../../functions'


import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 
import { Switch } from "react-native";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [nameUser, setNameUser] = useState()
    const [balanceAvailable, setBalanceAvailable] = useState()
    const [balanceAvailableBrazil, setBalanceAvailableBrazil] = useState()
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState()
    const [autoReinvestment, setAutoReinvestment] = useState();
    const [showAmounts, setShowAmounts] = useState(false);

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
            setAutoReinvestment(result.auto_reinvestment === 1 ? true : false);
        }else{
            alert(result.error);
        }
    }

    const toggleShowAmount= () => (setShowAmounts(!showAmounts));

    const toggleAutoReinvestment= async () => {
        setAutoReinvestment(!autoReinvestment);
        if(autoReinvestment === false){
            let data = {
                active: 1,
            }
            let result = await api.postAutoReinvest(data);
            alert('Reinvestimento automático ativado');
        } else {
            let data = {
                active: 0,
            }
            let result = await api.postAutoReinvest(data);
            alert('Reinvestimento automático desativado');
        }
    }

    return (
        <C.Container>
            
            <C.ContainerInitial>
                <C.TitleInitial>Olá, {nameUser}</C.TitleInitial>
            </C.ContainerInitial>
            
            <C.SubContainer>
                <C.SubContainerSwitch>
                <Switch 
                    trackColor={{false: '#777', true: '#8bf'}}
                    thumbColor={showAmounts ? '#00f' : '#444'}
                    value={showAmounts}
                    onValueChange={toggleShowAmount}
                />
                <C.InformativeText>{!showAmounts ? 'Exibir Saldo' : 'Esconder Saldo'}</C.InformativeText>
                </C.SubContainerSwitch>
                <C.TitleSubContainer>Seu Patrimônio:</C.TitleSubContainer>
                <C.Balance>{showAmounts ? 'R$ 0,00' : '****'}</C.Balance>
                <C.InformativeText>* Este valor representa a soma do saldo disponível e de todos os produtos investidos em sua conta.</C.InformativeText>
                <C.SubContainerSwitch>
                <Switch 
                    trackColor={{false: '#777', true: '#8bf'}}
                    thumbColor={autoReinvestment ? '#00f' : '#444'}
                    value={autoReinvestment}
                    onValueChange={toggleAutoReinvestment}
                />
                <C.Balance>{autoReinvestment ? 'Desabilitar Reinvestimento Automático' : 'Habilitar Reinvestimento Automático'}</C.Balance>
                </C.SubContainerSwitch>
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
                
                <C.SubTitleSubContainer>Investimento:</C.SubTitleSubContainer>
                <C.Balance>{showAmounts ? `${formatCurrency(balanceAvailable)}` : '****'}</C.Balance>
                
                <C.SubTitleSubContainer>Saldo Disponível no Brasil</C.SubTitleSubContainer>
                <C.Balance>{showAmounts ? `${formatCurrency(balanceAvailableBrazil)}` : '****'}</C.Balance>
                
                <C.SubTitleSubContainer>Saldo Disponível no Exterior</C.SubTitleSubContainer>
                <C.Balance>{showAmounts ? `${formatCurrency(balanceAvailableExterior)}` : '****'}</C.Balance>
            </C.SubContainer>
            
        </C.Container>
    );

}