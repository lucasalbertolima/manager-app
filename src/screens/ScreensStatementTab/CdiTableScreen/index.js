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

    const [cdi, setCdi] = useState([]);


    useEffect(()=>{
        getCdiHistoric();
    }, []);

    const getCdiHistoric = async () => {
        const result = await api.getCdiHistoric();
        if(result && result.cdi) {
            setCdi(result.cdi)
        }else{
            alert(result.error);
        }
    }

    return (
            <C.Container>
                {!cdi && (<Text>Não há Histórico a ser mostrado</Text>)}
                <FlatList 
                    data={cdi}
                    renderItem={({item})=>(
                        <C.SubContainer>
                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Mês: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.cm.month}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>Rendimento: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{formatCurrency(item.amount)}</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                            <C.SubContainerFlex>
                                <C.TitleSubContainer>CDI: {' '}</C.TitleSubContainer>
                                <C.SubTitleSubContainer>{item.cdi}%</C.SubTitleSubContainer>
                            </C.SubContainerFlex>

                        </C.SubContainer>
                    )}
                    keyExtractor={item => (item.id)}

                />

            </C.Container>
    );

}