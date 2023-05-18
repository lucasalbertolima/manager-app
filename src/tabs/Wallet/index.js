import React, {useState, useEffect} from "react";
import { Text } from "react-native";
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
             <Text>Olá bem vindo {user}</Text>
        </C.Container>
    );

}