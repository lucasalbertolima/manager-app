import styled from "styled-components/native";

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding: 10px;
        background-color: #F5F6FA;
        margin: 10px;
    `,
    SubContainer: styled.View`
        background-color: #EBECF0;
        border-radius: 3px;
        border: 1px solid #a9a9a9;
        margin-bottom: 8px;
        padding: 20px;
    `,
    SubContainerFlex: styled.View`
        flex-direction: row;
        justify-content: flex-start;
        align-items: baseline;
    `,
    TitleSubContainer: styled.Text`
        color: #000;
        font-size: 18px;
        font-weight: bold;
    `,
    SubTitleSubContainer: styled.Text`
        color: #000;
        font-size: 18px;
    `,
    Balance: styled.Text`
        color: #000;
        font-size: 15px;
    `,
    InformativeText: styled.Text`
        color: #000;
        font-size: 13px;
    `,
    ButtonSeeMore: styled.TouchableOpacity`
        margin-top: 5px;
        background-color: #000;
        padding: 10px;
        width: 40%;
        align-items: center;
        border-radius: 3px;
    `,
    ButtonSeeMoreText: styled.Text`
        color: #FFF;
        font-weight: bold;
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
    RoundButtonText: styled.Text`
        color: #000;
        font-size: 16px;
        font-weight: bold;
    `
};