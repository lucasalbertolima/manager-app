import React, {useState, useEffect} from "react";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import C from './style';

export default () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Fazer Cadastro'
        })
    }, []);

    return (
        <C.Container>
            <WebView
                source={{uri: 'https://app.managertrading.com/signup'}}
            />
        </C.Container>
    );

}