import React, {useState} from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import C from './style';

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();


    return (
        <C.Container>
            <Text>Olá bem vindo</Text>
        </C.Container>
    );

}