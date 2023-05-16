import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = async () => {
        if(email && password) {
            let result = await api.login(email, password);
            if(result.token != null){
                dispatch({type: 'setToken', payload: result.token});

                navigation.reset({
                    index: 1,
                    routes: [{name: 'ChoosePropertyScreen'}]}
                );
            } else {
                alert("Senha e/ou email incorreto(s)");
            } 
        } else {
            alert("Preencha os campos");
        }

    }

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <C.Container>
            <C.Logo
                source={require('../../assets/logo.png')}
                resizeMode="contain"
            />

            <C.Field
                placeholder="Digite seu email"
                value={email}
                onChangeText={t=>setEmail(t)}
            />

            <C.Field
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />

            <C.ButtonArea onPress={handleLoginButton}>
                <C.ButtonText>ENTRAR</C.ButtonText>
            </C.ButtonArea>

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>

        </C.Container>
    );

}