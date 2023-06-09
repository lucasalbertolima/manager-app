import styled from "styled-components/native";
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export default {
    Container: styled.SafeAreaView`
        margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '30px'};
        margin: 10px;
        flex: 1;
        padding: 10px;
        background-color: #FFF;
    `,
    ContainerInitial: styled.View`
        padding: 10px;
        padding-bottom: 25px;
        border-radius: 5px;
    `,
    TitleInitial: styled.Text`
        color: #000;
        font-size: 25px;
        font-weight: bold;
    `,
    ContainerButton: styled.TouchableOpacity`
        background-color: #EBECF0;
        margin-bottom: 12px;
        border: 1px solid #a9a9a9;
        padding: 10px
    `,
    TitleSubContainer: styled.Text`
        color: #000;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 3px;
    `,
    SubTitleSubContainer: styled.Text`
        color: #000;
        font-size: 21px;
        font-weight: bold;
    `,
    InformativeText: styled.Text`
        color: #000;
        font-size: 13px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #000;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `
};