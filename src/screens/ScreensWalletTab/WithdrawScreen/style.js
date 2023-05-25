import styled from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text';

export default {
    Container: styled.ScrollView`
        flex: 1;
        padding: 10px;
        background-color: #F5F6FA;
    `,
    SubContainer: styled.View`
        background-color: #EBECF0;
        padding: 10px;
        padding-top: 15px;
        padding-bottom: 10px;
        border-radius: 3px;
        border: 1px solid #a9a9a9;
        margin-bottom: 12px;
    `,
    TitleSubContainer: styled.Text`
        color: #000;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 4px;
    `,
    SubTitleSubContainer: styled.Text`
        color: #000;
        font-size: 16px;
        margin-bottom: 5px;
    `,
    Balance: styled.Text`
        color: #000;
        font-size: 15px;
        margin-bottom: 3px;
    `,
    InformativeText: styled.Text`
        color: #000;
        font-size: 13px;
    `,
    TextInputContainer: styled(TextInputMask)`
        background-color: #FFF;
        font-size: 16px;
        margin-bottom: 5px;
        padding: 5px;
        border: 1px solid #a9a9a9;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #000;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 15px;
        margin-top: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    RoundButtonImage: styled.Image`
        width: 40px;
        height: 40px;    
    `,
    RoundButtonText: styled.Text`
        color: #000;
        font-size: 16px;
        font-weight: bold;
    `
};