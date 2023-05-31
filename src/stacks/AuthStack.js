import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from "../screens/LoginScreen";
import MainTab from "../tabs/MainTab";


// TELAS DA TAB EXTRATO
import CdiTableScreen from "../screens/ScreensStatementTab/CdiTableScreen";
import DepositsTableScreen from "../screens/ScreensStatementTab/DepositsTableScreen";
import HistoricTableScreen from "../screens/ScreensStatementTab/HistoricTableScreen";
import InternalTransfersTableScreen from "../screens/ScreensStatementTab/InternalTransfersTableScreen";
import InvestmentsTableScreen from "../screens/ScreensStatementTab/InvestmentsTableScreen";
import RescuesTableScreen from "../screens/ScreensStatementTab/RescuesTableScreen";
import QuotaTableScreen from "../screens/ScreensStatementTab/QuotaTableScreen";
import WithdrawsTableScreen from "../screens/ScreensStatementTab/WithdrawsTableScreen";


// TELAS DA TAB CARTEIRA
import DepositScreen from "../screens/ScreensWalletTab/DepositScreen";
import InternalTransferScreen from "../screens/ScreensWalletTab/InternalTransferScreen";
import InvestmentScreen from "../screens/ScreensWalletTab/InvestmentScreen";
import RescueScreen from "../screens/ScreensWalletTab/RescueScreen";
import WithdrawScreen from "../screens/ScreensWalletTab/WithdrawScreen";


// TELAS DA TAB PERFIL
import ProfileDataScreen from "../screens/ScreensProfileTab/ProfileDataScreen";
import UpdatePasswordScreen from "../screens/ScreensProfileTab/UpdatePasswordScreen";
import UpdateProfileScreen from "../screens/ScreensProfileTab/UpdateProfileScreen";
import UpdateBankAccountScreen from "../screens/ScreensProfileTab/UpdateBankAccountScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PreloadScreen"
                component={PreloadScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{headerShown: false}}
            />



            <Stack.Screen
                name="CdiTableScreen"
                component={CdiTableScreen}
                options={{
                    title: 'Extrato - CDI'
                }}
            /> 
            <Stack.Screen
                name="DepositsTableScreen"
                component={DepositsTableScreen}
                options={{
                    title: 'Extrato - Depósitos'
                }}
            />  
            <Stack.Screen
                name="HistoricTableScreen"
                component={HistoricTableScreen}
                options={{
                    title: 'Histórico'
                }}
            />
            <Stack.Screen
                name="InternalTransfersTableScreen"
                component={InternalTransfersTableScreen}
                options={{
                    title: 'Extrato - Transferências internas'
                }}
            />  
            <Stack.Screen
                name="InvestmentsTableScreen"
                component={InvestmentsTableScreen}
                options={{
                    title: 'Extrato - Investimentos'
                }}
            />  
            <Stack.Screen
                name="RescuesTableScreen"
                component={RescuesTableScreen}
                options={{
                    title: 'Extrato - Resgates'
                }}
            />   
            <Stack.Screen
                name="QuotaTableScreen"
                component={QuotaTableScreen}
                options={{
                    title: 'Extrato - Histórico da Cota'
                }}
            />   
            <Stack.Screen
                name="WithdrawsTableScreen"
                component={WithdrawsTableScreen}
                options={{
                    title: 'Extrato - Saques'
                }}
            />     


            

            <Stack.Screen
                name="DepositScreen"
                component={DepositScreen}
                options={{
                    title: 'Solicitar Depósito'
                }}
            />
            <Stack.Screen
                name="InternalTransferScreen"
                component={InternalTransferScreen}
                options={{
                    title: 'Transferência interna'
                }}
            />  
            <Stack.Screen
                name="InvestmentScreen"
                component={InvestmentScreen}
                options={{
                    title: 'Investir'
                }}
            />  
            <Stack.Screen
                name="RescueScreen"
                component={RescueScreen}
                options={{
                    title: 'Resgatar'
                }}
            />   
            <Stack.Screen
                name="WithdrawScreen"
                component={WithdrawScreen}
                options={{
                    title: 'Solicitar Saque'
                }}
            />    



            <Stack.Screen
                name="ProfileDataScreen"
                component={ProfileDataScreen}
                options={{
                    title: 'Dados Pessoais'
                }}
            />
            <Stack.Screen
                name="UpdatePasswordScreen"
                component={UpdatePasswordScreen}
                options={{
                    title: 'Alterar senha'
                }}
            />
            <Stack.Screen
                name="UpdateProfileScreen"
                component={UpdateProfileScreen}
                options={{
                    title: 'Atualizar Perfil'
                }}
            />
            <Stack.Screen
                name="UpdateBankAccountScreen"
                component={UpdateBankAccountScreen}
                options={{
                    title: 'Atualizar Dados Bancários'
                }}
            />

        </Stack.Navigator>
    )
}