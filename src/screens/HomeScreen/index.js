import React, {useState, useEffect} from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [user, setUser] = useState();
    const [saldo, setSaldo] = useState(0);


    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        const result = await api.getUser();
        if(result && result.name) {
            setUser(result.name);
            setSaldo(result.balance_available);
        }else{
            alert(result.error);
        }
    }

    const handleLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}]}
        );
    }

    return (
        <C.Container>
            <Text>Olá bem vindo {user}</Text>
            <Text>Seu saldo é: {saldo}</Text>

            <C.ButtonArea onPress={handleLogoutButton}>
                <C.ButtonText>Sair</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );

}