import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { Linking } from "react-native";

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordTwo, setNewPasswordTwo] = useState('');

    const handlePassworButton = async () => {
        if(password && newPassword && newPasswordTwo && newPassword === newPasswordTwo) {
            let token = await api.updatePassword(newPassword, password);
            if(token.length > 0){
                dispatch({type: 'setToken', payload: token});
            } else if(error === "Senha Incorreta") {
                alert("Senha atual incorreta");
            } else {
                alert(error);
            }
        } else {
            alert("Preencha os campos corretamente");
        }

    }

    return (
        <C.Container>

            <C.TextWarn>Sua Senha deve possuir:</C.TextWarn>
            <C.TextWarn>No mínimo 8 dígitos</C.TextWarn>
            <C.TextWarn>No máximo 16 dígitos</C.TextWarn>

            <C.Field
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />

            <C.Field
                placeholder="Digite sua nova senha"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={t=>setNewPassword(t)}
            />

            <C.Field
                placeholder="Digite sua nova senha"
                secureTextEntry={true}
                value={newPasswordTwo}
                onChangeText={t=>setNewPasswordTwo(t)}
            />

            <C.ButtonArea onPress={handlePassworButton}>
                <C.ButtonText>Alterar Senha</C.ButtonText>
            </C.ButtonArea>

        </C.Container>
    );

}