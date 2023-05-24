import React, {useState, useEffect} from "react";
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
    const handleLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}]}
        );
    }

    return (
        <C.Container>
            <C.ContainerInitial>
                <C.TitleInitial>Perfil: {'\n'}{user}</C.TitleInitial>
            </C.ContainerInitial>


            <C.ContainerButton onPress={() => navigation.navigate('ProfileDataScreen')}>
                    <C.TitleSubContainer>Meus Dados</C.TitleSubContainer>
                    <C.InformativeText>Minhas informações da conta</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton  onPress={() => navigation.navigate('UpdateProfileScreen')}>
                    <C.TitleSubContainer>Alterar Perfil</C.TitleSubContainer>
                    <C.InformativeText>Atualize o perfil da sua conta</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('UpdateBankAccountScreen')}>
                    <C.TitleSubContainer>Alterar Conta Bancária</C.TitleSubContainer>
                    <C.InformativeText>Altere suas informações bancárias</C.InformativeText>
            </C.ContainerButton>

            <C.ContainerButton onPress={() => navigation.navigate('UpdatePasswordScreen')}>
                    <C.TitleSubContainer>Alterar Senha</C.TitleSubContainer>
                    <C.InformativeText>Altere sua senha</C.InformativeText>
            </C.ContainerButton>


            <C.ButtonArea onPress={handleLogoutButton}>
                <C.ButtonText>Sair</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );

}