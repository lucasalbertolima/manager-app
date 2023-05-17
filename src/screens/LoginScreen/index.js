import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import C from './style';
import { Linking } from "react-native";

import api from '../../services/api';
import { useStateValue } from '../../contexts/StateContext'; 

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = async () => {
        if(email && password) {
            let token = await api.login(email, password);
            if(token != null){
                dispatch({type: 'setToken', payload: token});

                navigation.reset({
                    index: 1,
                    routes: [{name: 'HomeScreen'}]}
                );
            } else {
                alert("Senha e/ou email incorreto(s)");
            } 
        } else {
            alert("Preencha os campos");
        }

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

            <C.TextSignupForget>
                Não possui cadastro?{' '}
                <C.TextLink onPress={()=>{Linking.openURL('https://app.managertrading.com/signup')}}>
                    Registre-se
                </C.TextLink>
            </C.TextSignupForget>

            <C.TextSignupForget>
                Esqueceu sua senha?{' '}
                <C.TextLink onPress={()=>{Linking.openURL('https://app.managertrading.com/forget-password')}}>
                    Recupere Aqui!
                </C.TextLink>
            </C.TextSignupForget>

        </C.Container>
    );

}