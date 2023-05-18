import styled from "styled-components/native";
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export default {
    Container: styled.SafeAreaView`
        margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : 0};
        flex: 1;
        padding: 10px;
        background-color: #F5F6FA;
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
    SubContainer: styled.View`
        background-color: #EBECF0;
        padding: 10px;
        padding-bottom: 25px;
        border-radius: 3px;
        border: 1px solid #a9a9a9;
        margin-bottom: 12px;
    `,
    TitleSubContainer: styled.Text`
        color: #000;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
    `,
    SubTitleSubContainer: styled.Text`
        color: #000;
        font-size: 21px;
        font-weight: bold;
    `,
    Balance: styled.Text`
        color: #000;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 7px;
    `,
    InformativeText: styled.Text`
        color: #000;
        font-size: 13px;
    `,
    ContainerRoundButton: styled.View`
        padding: 10px;
        margin-bottom: 10px;
        flex-direction: row;
        justify-content: space-between;
    `,
    RoundButtonArea: styled.View`
        flex: 1;
        justifyContent: center;
        alignItems: center;
    `,
    RoundButton: styled.TouchableHighlight`
        background-color: #FFF;
        border: 1px solid #a9a9a9;
        width: 75px;
        height: 55px;
        justifyContent: center;
        alignItems: center;
        border-radius: 20px;
        margin-bottom: 6px;
    `,
    RoundButtonImage: styled.Image`
        width: 30px;
        height: 30px;    
    `,
    RoundButtonText: styled.Text`
        color: #000;
        font-size: 16px;
        font-weight: bold;
    `
};