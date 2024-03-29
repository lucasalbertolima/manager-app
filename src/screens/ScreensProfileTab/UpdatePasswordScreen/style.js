import styled from "styled-components/native";

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding: 20px;
        background-color: #F5F6FA;
        justify-content: center;
        margin: 10px;
    `,
    Logo: styled.Image`
        width: 300px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        background-color: #000;
    `,
    Field: styled.TextInput`
        border-width: 1px;
        border-color: #CCC;
        background-color: #FFF;
        border-radius: 5px;
        color: #000;
        font-size: 15px;
        padding: 15px;
        margin-bottom: 15px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #000;
        padding: 15 px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 15px;
    `,
    ButtonText: styled.Text`
        color: #FFF;
        font-size: 15px;
        font-weight: bold;
    `,
    TextWarn: styled.Text`
        font-size: 20px;
        color: #000;
        margin-bottom: 30px;
    `
};