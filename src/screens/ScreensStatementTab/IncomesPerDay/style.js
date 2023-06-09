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
};