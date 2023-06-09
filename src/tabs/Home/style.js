import styled from "styled-components/native";
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export default {
    Container: styled.ScrollView`
        margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '30px'};
        flex: 1;
        padding: 10px;
        background-color: #F5F6FA;
    `,
    ContainerInitial: styled.View`
        padding: 10px;
        border-radius: 5px;
    `,
    SubContainerSwitch: styled.View`
        flex-direction: row;
        margin-left: -10px;
        justify-content: flex-start;
        align-items: center;
    `,
    TitleInitial: styled.Text`
        color: #3C3C3C;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
    `,
    SubContainer: styled.View`
        background-color: #FFF;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid #a9a9a9;
        margin-bottom: 12px;
    `,
    SubContainerGraph: styled.View`
        background-color: #FFF;
        padding-left: -10px;
        padding-top: 15px;
        border-radius: 3px;
        border-bottom: 1px solid #a9a9a9;
        border-top: 1px solid #a9a9a9;
        margin-bottom: 12px;
    `,

    TitleSubContainer: styled.Text`
        color: #3C3C3C;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
    `,
    SubTitleSubContainer: styled.Text`
        color: #3C3C3C;
        font-size: 21px;
        font-weight: bold;
    `,
    Balance: styled.Text`
        color: #3C3C3C;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 4px;
    `,
    SubContainerFlex: styled.View`
        flex-direction: row;
        justify-content: flex-start;
        align-items: baseline;
    `,
    InformativeText: styled.Text`
        color: #3C3C3C;
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
    RoundButton: styled.TouchableOpacity`
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
        width: 40px;
        height: 40px;    
    `,
    RoundButtonText: styled.Text`
        color: #3C3C3C;
        font-size: 16px;
        font-weight: bold;
    `,
    Icon: styled.TouchableOpacity`
        margin: 10px;
        padding: 0.4px;
    `
};