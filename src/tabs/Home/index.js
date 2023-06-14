import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { formatCurrency } from '../../functions';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory-native';
import {Picker} from '@react-native-picker/picker';
import { Switch, RefreshControl } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import api from '../../services/api';


export default () => {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [nameUser, setNameUser] = useState('')
    const [investment, setInvestment] = useState(0)
    const [patrimony, setPatrimony] = useState(0)
    const [balanceAvailableBrazil, setBalanceAvailableBrazil] = useState(0)
    const [balanceAvailableExterior, setBalanceAvailableExterior] = useState(0)
    const [autoReinvestment, setAutoReinvestment] = useState();
    const [showAmounts, setShowAmounts] = useState(false);

    const [performances, setPerformances] = useState([]);
    const [count, setCount] = useState("");
  
    const [symbols, setSymbols] = useState([]);
    const [chosenSymbol, setChosenSymbol] = useState();

    useEffect(()=>{
        getUser();
        getBalances();
        getQuotaHistoric();
        getSymbols();
    }, []);

    useEffect(() => {
        getQuotaHistoric();
      }, [chosenSymbol]);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setNameUser(result.name);
            setAutoReinvestment(result.auto_reinvestment === 1 ? true : false);
        }
    }

    const getBalances = async () => {
        const result = await api.getBalances();
        if(result && result.balance) {
            setPatrimony(result.total_balance);
            setInvestment(result.balance);
            setBalanceAvailableBrazil(result.local_balance);
            setBalanceAvailableExterior(result.foreign_balance);
        }
    }

    const getQuotaHistoric = async () => {
        const result = await api.getQuotaHistoric(chosenSymbol);
        if (result && result.performances) {
          const performancesWithAccumulated = result.performances.map((performance, index) => {
            const previousPerformances = result.performances.slice(0, index + 1);
            const accumulatedValue = previousPerformances.reduce(
              (total, performance) => total + performance.amount_percentage,
              0
            );
            return {
              ...performance,
              amount_percentage: accumulatedValue,
              formattedDate: new Date(performance.date).toLocaleDateString('pt-BR', { day: 'numeric' }),
            };
          });
    
          setPerformances(performancesWithAccumulated);
          setCount(result.count);
        }
      };
    
      const getSymbols = async () => {
        const result = await api.getSymbols();
        if(result) {
            setSymbols(result);
            setChosenSymbol(result[0].id);
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

    const onRefresh = async () => {
        setRefreshing(true);
        await getUser();
        await getBalances();
        setRefreshing(false);
      };


    return (
        <C.Container refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            
            <C.ContainerInitial>
                <C.TitleInitial>Olá, {nameUser?.split(' ')[0]}</C.TitleInitial>
            </C.ContainerInitial>
            
            <C.SubContainer>
                <C.SubContainerSwitch>
                <C.Icon onPress={toggleShowAmount}>
                    <Ionicons name={!showAmounts ? 'eye' : 'eye-off'} size={24} color='black' />
                </C.Icon>
                <C.InformativeText>{!showAmounts ? 'Exibir Saldo' : 'Esconder Saldo'}</C.InformativeText>
                </C.SubContainerSwitch>
                <C.TitleSubContainer>Seu Patrimônio:</C.TitleSubContainer>
                <C.Balance>{showAmounts ? formatCurrency(patrimony) : '****'}</C.Balance>
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
                <C.Balance>{showAmounts ? `${formatCurrency(investment)}` : '****'}</C.Balance>
                
                <C.SubTitleSubContainer>Saldo Disponível no Brasil</C.SubTitleSubContainer>
                <C.Balance>{showAmounts ? `${formatCurrency(balanceAvailableBrazil)}` : '****'}</C.Balance>
                
                <C.SubTitleSubContainer>Saldo Disponível no Exterior</C.SubTitleSubContainer>
                <C.Balance>{showAmounts ? `${formatCurrency(balanceAvailableExterior)}` : '****'}</C.Balance>
            </C.SubContainer>

            <C.SubContainerGraph>
            <C.SubTitleSubContainer>Rendimentos do Mês:</C.SubTitleSubContainer>
            {count === "0" && 
            (<C.InformativeText style={{marginTop: 10, marginBottom: 20}}>Ainda Não Há dados a serem exibidos esse mês.</C.InformativeText>
            )}
            {count !== "0" && 
            (<><Picker
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
            <VictoryChart
            theme={VictoryTheme.material}
            >
            <VictoryLine
                style={{
                data: { stroke: "#4169E1" },
                parent: { border: "1px solid #000"}
                }}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 2000 }
                  }}
                data={performances}
                x= "formattedDate"
                y= "amount_percentage"
                tickValues={performances.map((performance, index) => index)}
                tickFormat={(value) => performances[value]?.formattedDate}
            />
            </VictoryChart></>
            )}
            </C.SubContainerGraph>
            

        </C.Container>
    );

}